import { useRef, useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { TreeSubmission } from '../types';
import { fetchTrees } from '../utils/api';
import { getTreeMarkerIcon } from '../components/Map/MapUtils';
import { createAddTreeInfoWindowWithReact } from '../components/Map/AddTreeInfoWindow';
import { useNavigationHistory } from '../hooks/useNavigationHistory';
import { useDarkMode } from '../hooks/useDarkMode';

const Map = () => {
  const { navigateWithHistory } = useNavigationHistory();
  const { isDarkMode } = useDarkMode();
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

  // Navigation function for tree details
  const handleViewTreeDetails = (treeId: string) => {
    navigateWithHistory(`/tree/${treeId}`);
  };

  // Add global functions for InfoWindow buttons
  useEffect(() => {
    // Global function for tree details navigation
    (window as any).viewTreeDetails = (treeId: string) => {
      navigateWithHistory(`/tree/${treeId}`);
    };
  }, [navigateWithHistory]);

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

        // Default to center of Poland (near Łódź) to show all trees
        let initialCenter = { lat: 52.2297, lng: 19.9450 };

        const mapInstance = new Map(mapRef.current, {
          center: initialCenter,
          zoom: 7, // Zoom out to show more of Poland
          mapTypeId: google.maps.MapTypeId.ROADMAP
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
            if (addTreeInfoWindowRef.current) {
              addTreeInfoWindowRef.current.close();
            }
            
            addTreeInfoWindowRef.current = createAddTreeInfoWindowWithReact(
              mapInstance,
              { lat, lng },
              (lat: number, lng: number) => {
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
              }
            );
            
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
      // Use original locations from backend API
      setTrees(treesData);
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
            
            <div style="display: flex; justify-content: center; align-items: center; margin-top: 8px;">
              <div style="font-size: 12px; color: #000000; font-weight: 700;">
                Pierśnica: ${tree.circumference} cm
              </div>
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
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-dark-card transition-colors duration-200">
        <div className="text-center text-red-600 dark:text-red-400">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-hidden bg-gray-50 dark:bg-dark-bg transition-colors duration-200" style={{ touchAction: 'pan-x pan-y' }}>
      <div 
        ref={mapRef} 
        className="w-full h-full"
        style={{
          position: 'absolute',
          top: '0px',
          left: '0',
          right: '0',
          bottom: '0px',
          zIndex: 1
        }}
      />
    </div>
  );
};

export default Map;