import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from '@googlemaps/js-api-loader';
import { Plus, MapPin, TreePine, Award, CheckCircle, Clock } from 'lucide-react';
import { fetchTrees } from '../utils/api';
import { TreeSubmission } from '../types';

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [trees, setTrees] = useState<TreeSubmission[]>([]);
  const [selectedTree, setSelectedTree] = useState<TreeSubmission | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const selectedMarkerRef = useRef<google.maps.Marker | null>(null);
  const addTreeInfoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const treeDetailsInfoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Add global functions for InfoWindow buttons BEFORE useEffect
  React.useEffect(() => {
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

  useEffect(() => {
    loadTrees();
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
              console.log('Could not get user location, using Rzeszów');
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
            const addTreeContent = `
              <div style="padding: 12px 16px; text-align: center; min-width: 220px; border-radius: 16px; background: linear-gradient(135deg, rgba(240, 253, 244, 0.95) 0%, rgba(220, 252, 231, 0.95) 100%); backdrop-filter: blur(15px); border: 2px solid rgba(34, 197, 94, 0.2);">
                <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; box-shadow: 0 4px 16px rgba(34, 197, 94, 0.3); border: 3px solid rgba(34, 197, 94, 0.4);">
                  <svg width="24" height="24" fill="#16a34a" viewBox="0 0 24 24">
                    <path d="M12 2C8 2 4 4 2 8C0 6 -4 6 -6 8C-8 10 -8 14 -6 16C-8 18 -8 22 -4 24C-6 26 -4 30 0 30C-2 34 2 38 6 36C4 40 8 44 12 42C16 44 20 40 18 36C22 38 26 34 24 30C28 30 30 26 28 24C32 22 32 18 30 16C32 14 32 10 30 8C28 6 24 6 22 8C20 4 16 2 12 2Z" transform="translate(12,12) scale(0.4) translate(-12,-12)"/>
                  </svg>
                </div>
                <h3 style="font-size: 20px; font-weight: 800; color: #15803d; margin: 6px 0 8px 0; text-shadow: 0 1px 2px rgba(0,0,0,0.1);">
                  Dodaj nowe drzewo
                </h3>
                <p style="font-size: 15px; color: #166534; margin-bottom: 10px; font-weight: 600;">
                  Czy chcesz dodać drzewo w tej lokalizacji?
                </p>
                <p style="font-size: 13px; color: #059669; margin-bottom: 12px; font-weight: 500; background: rgba(255,255,255,0.6); padding: 4px 8px; border-radius: 8px;">
                  ${lat.toFixed(6)}, ${lng.toFixed(6)}
                </p>
                <div style="display: flex; gap: 10px;">
                  <button onclick="window.cancelAddTree()" style="flex: 1; padding: 10px 14px; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(15px); border: 2px solid rgba(229, 231, 235, 0.8); color: #374151; border-radius: 10px; font-size: 13px; cursor: pointer; font-weight: 700; transition: all 0.3s; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    Anuluj
                  </button>
                  <button onclick="window.addTreeAtLocation(${lat}, ${lng})" style="flex: 1; padding: 10px 14px; background: linear-gradient(135deg, rgba(5, 150, 105, 0.9) 0%, rgba(5, 150, 105, 0.7) 100%); backdrop-filter: blur(15px); border: 2px solid rgba(5, 150, 105, 0.6); color: white; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.4); transition: all 0.3s;" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 6px 16px rgba(5, 150, 105, 0.5)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 12px rgba(5, 150, 105, 0.4)'">
                    Dodaj drzewo
                  </button>
                </div>
              </div>
            `;
            
            if (addTreeInfoWindowRef.current) {
              addTreeInfoWindowRef.current.close();
            }
            
            addTreeInfoWindowRef.current = new google.maps.InfoWindow({
              content: addTreeContent,
              position: { lat: lat + 0.0003, lng },
              disableAutoPan: false
            });
            
            addTreeInfoWindowRef.current.open(mapInstance);
            
            // Ensure the InfoWindow is properly rendered before adding event listeners
            setTimeout(() => {
              console.log('InfoWindow should be ready now');
            }, 100);
          }
        });

      } catch (err) {
        console.error('Error loading map:', err);
        setError(`Błąd ładowania mapy: ${err}`);
      }
    };

    initMap();
  }, []);

  useEffect(() => {
    if (map && trees.length > 0) {
      addTreeMarkers();
    }
  }, [map, trees]);

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

  const addTreeMarkers = () => {
    if (!map) return;
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    
    // Add markers for each tree
    trees.forEach(tree => {
      const marker = new google.maps.Marker({
        position: { lat: tree.location.lat, lng: tree.location.lng },
        map,
        title: tree.species,
        icon: {
          url: getTreeMarkerIcon(tree.status),
          scaledSize: new google.maps.Size(48, 48),
          anchor: new google.maps.Point(24, 44),
        }
      });
      
      // Add click listener to show tree details
      marker.addListener('click', () => {
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
        const treeDetailsContent = `
          <div style="padding: 8px 12px; min-width: 240px; max-width: 280px;">
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 10px;">
              <div style="flex: 1; min-width: 0;">
                <h3 style="font-size: 15px; font-weight: 800; color: #000000; margin: 2px 0 2px 0;">${tree.species}</h3>
                <p style="font-size: 12px; color: #000000; font-style: italic; font-weight: 600; margin: 0;">${tree.speciesLatin}</p>
              </div>
              ${tree.images && tree.images.length > 0 ? `
                <img src="${tree.images[0]}" alt="${tree.species}" style="width: 100px; height: 70px; object-fit: cover; border-radius: 8px; border: 2px solid #e5e7eb; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              ` : ''}
            </div>
            
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              ${getStatusIconSVG(tree.status)}
              <span style="padding: 4px 8px; border-radius: 12px; font-size: 11px; font-weight: 700; ${getStatusColorInline(tree.status)}">
                ${getStatusLabel(tree.status)}
              </span>
            </div>
            
            <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: #000000; margin-bottom: 6px; font-weight: 600;">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span style="font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 600;">${tree.location.address}</span>
            </div>
            
            <p style="font-size: 12px; color: #000000; line-height: 1.4; margin-bottom: 8px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; font-weight: 500;">
              ${tree.description.length > 80 ? tree.description.substring(0, 80) + '...' : tree.description}
            </p>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
              <div style="font-size: 12px; color: #000000; font-weight: 700;">
                Pierśnica: ${tree.circumference} cm
              </div>
              <a href="/tree/${tree.id}" style="padding: 6px 12px; background: linear-gradient(135deg, rgba(5, 150, 105, 0.9) 0%, rgba(5, 150, 105, 0.7) 100%); backdrop-filter: blur(15px); border: 2px solid rgba(5, 150, 105, 0.6); color: white; border-radius: 10px; font-size: 12px; font-weight: 700; text-decoration: none; transition: all 0.3s; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.3);">
                Zobacz szczegóły
              </a>
            </div>
          </div>
        `;
        
        if (treeDetailsInfoWindowRef.current) {
          treeDetailsInfoWindowRef.current.close();
        }
        
        treeDetailsInfoWindowRef.current = new google.maps.InfoWindow({
          content: treeDetailsContent,
          position: { lat: tree.location.lat + 0.0003, lng: tree.location.lng }
        });
        
        treeDetailsInfoWindowRef.current.open(map);
      });
      
      markersRef.current.push(marker);
    });
  };

  const getStatusIconSVG = (status: string) => {
    switch (status) {
      case 'monument': 
        return '<svg width="16" height="16" fill="#d97706" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
      case 'approved': 
        return '<svg width="16" height="16" fill="#16a34a" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
      case 'pending': 
        return '<svg width="16" height="16" fill="#ca8a04" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/></svg>';
      default: 
        return '<svg width="16" height="16" fill="#16a34a" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>';
    }
  };

  const getStatusColorInline = (status: string) => {
    switch (status) {
      case 'monument': return 'background: #fef3c7; color: #92400e;';
      case 'approved': return 'background: #dcfce7; color: #166534;';
      case 'pending': return 'background: #fef3c7; color: #92400e;';
      default: return 'background: #dcfce7; color: #166534;';
    }
  };
  const getTreeMarkerIcon = (status: string) => {
    switch (status) {
      case 'monument': 
        return 'data:image/svg+xml;base64,' + btoa(`
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="40" r="6" fill="#0F172A" opacity="0.3"/>
            <path d="M24 4C20 4 16 6 14 10C12 8 8 8 6 10C4 12 4 16 6 18C4 20 4 24 8 26C6 28 8 32 12 32C10 36 14 40 18 38C16 42 20 46 24 44C28 46 32 42 30 38C34 40 38 36 36 32C40 32 42 28 40 26C44 24 44 20 42 18C44 16 44 12 42 10C40 8 36 8 34 10C32 6 28 4 24 4Z" fill="#15803D"/>
            <path d="M24 12L26 20L34 20L28 26L30 34L24 30L18 34L20 26L14 20L22 20L24 12Z" fill="#FCD34D"/>
            <circle cx="24" cy="24" r="2" fill="#FCD34D"/>
          </svg>
        `);
      case 'approved': 
        return 'data:image/svg+xml;base64,' + btoa(`
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="40" r="6" fill="#0F172A" opacity="0.3"/>
            <path d="M24 4C20 4 16 6 14 10C12 8 8 8 6 10C4 12 4 16 6 18C4 20 4 24 8 26C6 28 8 32 12 32C10 36 14 40 18 38C16 42 20 46 24 44C28 46 32 42 30 38C34 40 38 36 36 32C40 32 42 28 40 26C44 24 44 20 42 18C44 16 44 12 42 10C40 8 36 8 34 10C32 6 28 4 24 4Z" fill="#22C55E"/>
            <path d="M18 24L22 28L30 20" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="24" cy="24" r="2" fill="#FFFFFF"/>
          </svg>
        `);
      case 'pending': 
        return 'data:image/svg+xml;base64,' + btoa(`
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="40" r="6" fill="#0F172A" opacity="0.3"/>
            <path d="M24 4C20 4 16 6 14 10C12 8 8 8 6 10C4 12 4 16 6 18C4 20 4 24 8 26C6 28 8 32 12 32C10 36 14 40 18 38C16 42 20 46 24 44C28 46 32 42 30 38C34 40 38 36 36 32C40 32 42 28 40 26C44 24 44 20 42 18C44 16 44 12 42 10C40 8 36 8 34 10C32 6 28 4 24 4Z" fill="#84CC16"/>
            <circle cx="24" cy="24" r="8" stroke="#FFFFFF" stroke-width="2" fill="none"/>
            <path d="M24 18V24L28 28" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `);
      case 'rejected':
        return 'data:image/svg+xml;base64,' + btoa(`
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="40" r="6" fill="#0F172A" opacity="0.3"/>
            <path d="M24 4C20 4 16 6 14 10C12 8 8 8 6 10C4 12 4 16 6 18C4 20 4 24 8 26C6 28 8 32 12 32C10 36 14 40 18 38C16 42 20 46 24 44C28 46 32 42 30 38C34 40 38 36 36 32C40 32 42 28 40 26C44 24 44 20 42 18C44 16 44 12 42 10C40 8 36 8 34 10C32 6 28 4 24 4Z" fill="#EF4444"/>
            <path d="M18 18L30 30M30 18L18 30" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
          </svg>
        `);
      default: 
        return 'data:image/svg+xml;base64,' + btoa(`
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="40" r="6" fill="#0F172A" opacity="0.3"/>
            <path d="M24 4C20 4 16 6 14 10C12 8 8 8 6 10C4 12 4 16 6 18C4 20 4 24 8 26C6 28 8 32 12 32C10 36 14 40 18 38C16 42 20 46 24 44C28 46 32 42 30 38C34 40 38 36 36 32C40 32 42 28 40 26C44 24 44 20 42 18C44 16 44 12 42 10C40 8 36 8 34 10C32 6 28 4 24 4Z" fill="#10B981"/>
            <circle cx="24" cy="24" r="3" fill="#FFFFFF"/>
          </svg>
        `);
    }
  };


  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'monument': return 'Pomnik przyrody';
      case 'approved': return 'Zatwierdzony';
      case 'pending': return 'Oczekuje weryfikacji';
      default: return 'Drzewo';
    }
  };


  if (error) {
    return (
      <div style={{
        position: 'absolute',
        top: '0px',
        left: 0,
        right: 0,
        bottom: '0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6'
      }}>
        <div style={{ textAlign: 'center', color: '#ef4444' }}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
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
    </div>
  );
};

export default Map;