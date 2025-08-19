import React, { useRef, useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { TreeSubmission } from '../../types';
import { fetchTrees } from '../../utils/api';
import { addTreeMarkers, createTreeDetailsContent } from './TreeMarkers';
import { createAddTreeContent, createAddTreeInfoWindow } from './AddTreeInfoWindow';
import MapErrorBoundary from './MapErrorBoundary';

interface MapContainerProps {
  children?: React.ReactNode;
}

const MapContainer = ({ children }: MapContainerProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [trees, setTrees] = useState<TreeSubmission[]>([]);
  const [selectedTree, setSelectedTree] = useState<TreeSubmission | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const markersRef = useRef<google.maps.Marker[]>([]);
  const selectedMarkerRef = useRef<google.maps.Marker | null>(null);
  const addTreeInfoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const treeDetailsInfoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  // Add global functions for InfoWindow buttons
  useEffect(() => {
    (window as any).addTreeAtLocation = (lat: number, lng: number) => {
      console.log('Redirecting to submit with:', lat, lng);
      if (addTreeInfoWindowRef.current) {
        addTreeInfoWindowRef.current.close();
      }
      if (selectedMarkerRef.current) {
        selectedMarkerRef.current.setMap(null);
        selectedMarkerRef.current = null;
      }
      setSelectedLocation(null);
      // Use React Router navigation instead of window.location
      const submitUrl = `/submit?lat=${lat}&lng=${lng}`;
      window.history.pushState({}, '', submitUrl);
      window.dispatchEvent(new PopStateEvent('popstate'));
    };
    
    (window as any).cancelAddTree = () => {
      if (addTreeInfoWindowRef.current) {
        addTreeInfoWindowRef.current.close();
      }
      if (selectedMarkerRef.current) {
        selectedMarkerRef.current.setMap(null);
        selectedMarkerRef.current = null;
      }
      setSelectedLocation(null);
    };
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;
    
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
          version: 'weekly',
          libraries: ['places'],
          region: 'PL',
          language: 'pl'
        });

        await loader.load();
        const { Map } = await google.maps.importLibrary('maps') as google.maps.MapsLibrary;
        
        if (!mapRef.current) return;

        // Default to Rzeszów
        let initialCenter = { lat: 50.0412, lng: 21.9991 };

        const mapInstance = new Map(mapRef.current, {
          center: initialCenter,
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        });
        
        setMap(mapInstance);
        
        // Try to get user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              mapInstance.setCenter(userLocation);
            },
            (error) => {
              console.log('Could not get user location, using Rzeszów'+error);
            }
          );
        }

        // Add click listener for adding new trees
        mapInstance.addListener('click', (e: google.maps.MapMouseEvent) => {
          if (e.latLng) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            
            // Clear previous tree selection
            setSelectedTree(null);
            if (treeDetailsInfoWindowRef.current) {
              treeDetailsInfoWindowRef.current.close();
            }
            
            setSelectedLocation({ lat, lng });
            
            // Remove previous selected marker
            if (selectedMarkerRef.current) {
              selectedMarkerRef.current.setMap(null);
            }
            
            // Add Google Maps style pointer at selected location
            const selectedMarker = new google.maps.Marker({
              position: { lat, lng },
              map: mapInstance,
              title: 'Wybrana lokalizacja',
              zIndex: 1000,
              icon: {
                url: 'data:image/svg+xml;base64,' + btoa(`
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="40" r="6" fill="#0F172A" opacity="0.3"/>
                    <path d="M24 4C20 4 16 6 14 10C12 8 8 8 6 10C4 12 4 16 6 18C4 20 4 24 8 26C6 28 8 32 12 32C10 36 14 40 18 38C16 42 20 46 24 44C28 46 32 42 30 38C34 40 38 36 36 32C40 32 42 28 40 26C44 24 44 20 42 18C44 16 44 12 42 10C40 8 36 8 34 10C32 6 28 4 24 4Z" fill="#10B981"/>
                    <circle cx="24" cy="24" r="3" fill="#FFFFFF"/>
                  </svg>
                `),
                scaledSize: new google.maps.Size(48, 48),
                anchor: new google.maps.Point(24, 44),
              }
            });
            
            selectedMarkerRef.current = selectedMarker;
            
            // Create and show InfoWindow for adding tree
            const addTreeContent = createAddTreeContent({
              lat,
              lng,
              onAddTree: () => {},
              onCancel: () => {}
            });
            
            if (addTreeInfoWindowRef.current) {
              addTreeInfoWindowRef.current.close();
            }
            
            addTreeInfoWindowRef.current = createAddTreeInfoWindow(
              mapInstance,
              { lat, lng },
              addTreeContent
            );
            
            addTreeInfoWindowRef.current.open(mapInstance);
          }
        });

      } catch (err) {
        console.error('Error loading map:', err);
        setError(`Błąd ładowania mapy: ${err}`);
      }
    };

    initMap();
  }, []);

  // Load trees
  useEffect(() => {
    const loadTrees = async () => {
      try {
        const treesData = await fetchTrees();
        // Position trees near Rzeszów for demo
        const rzeszowTrees = treesData.map((tree, index) => ({
          ...tree,
          location: {
            ...tree.location,
            lat: 50.0412 + (Math.random() - 0.5) * 0.1, // Random position around Rzeszów
            lng: 21.9991 + (Math.random() - 0.5) * 0.1
          }
        }));
        setTrees(rzeszowTrees);
      } catch (error) {
        console.error('Error loading trees:', error);
      }
    };

    loadTrees();
  }, []);

  // Add tree markers when map and trees are ready
  useEffect(() => {
    if (map && trees.length > 0) {
      // Clear existing markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
      
      // Add new markers
      const newMarkers = addTreeMarkers({
        map,
        trees,
        onTreeClick: (tree: TreeSubmission) => {
          // Clear selected location when clicking on tree
          setSelectedLocation(null);
          if (addTreeInfoWindowRef.current) {
            addTreeInfoWindowRef.current.close();
          }
          if (selectedMarkerRef.current) {
            selectedMarkerRef.current.setMap(null);
            selectedMarkerRef.current = null;
          }
          
          setSelectedTree(tree);
          
          // Create and show InfoWindow for tree details
          const treeDetailsContent = createTreeDetailsContent(tree);
          
          if (treeDetailsInfoWindowRef.current) {
            treeDetailsInfoWindowRef.current.close();
          }
          
          treeDetailsInfoWindowRef.current = new google.maps.InfoWindow({
            content: treeDetailsContent,
            position: { lat: tree.location.lat + 0.0003, lng: tree.location.lng }
          });
          
          treeDetailsInfoWindowRef.current.open(map);
        }
      });
      
      markersRef.current = newMarkers;
    }
  }, [map, trees]);

  return (
    <div className="relative">
      <MapErrorBoundary error={error} />
      
      <div 
        ref={mapRef} 
        style={{
          position: 'absolute',
          top: '0px',
          left: '0',
          right: '0',
          bottom: '0px',
          width: '100%',
          height: '100vh',
          zIndex: 1
        }}
      />
      
      {children}
    </div>
  );
};

export default MapContainer;
