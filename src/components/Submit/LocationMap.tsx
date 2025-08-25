import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useFormContext } from 'react-hook-form';

interface LocationMapProps {
  onLocationChange: (location: { lat: number; lng: number }) => void;
  initialLat?: number;
  initialLng?: number;
}

const LocationMap: React.FC<LocationMapProps> = ({ 
  onLocationChange, 
  initialLat, 
  initialLng 
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const { setValue } = useFormContext();

  useEffect(() => {
    const initMap = async () => {
      if (mapLoaded) return;
      
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
        });

        setMap(mapInstance);
        setMapLoaded(true);

        // Add click listener to set location
        mapInstance.addListener('click', (e: google.maps.MapMouseEvent) => {
          if (e.latLng) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            onLocationChange({ lat, lng });
            setValue('address', `Współrzędne: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
            
            // Clear existing markers
            markersRef.current.forEach(marker => marker.setMap(null));
            markersRef.current = [];
            
            // Add new marker  
            const marker = new google.maps.Marker({
              position: { lat, lng },
              map: mapInstance,
              title: 'Lokalizacja drzewa',
              zIndex: 999,
              icon: {
                url: 'data:image/svg+xml;base64,' + btoa(`
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="15" fill="#DC2626" stroke="#B91C1C" stroke-width="2"/>
                    <path d="M16 8L18 14L24 14L19.5 18L21.5 24L16 20.5L10.5 24L12.5 18L8 14L14 14L16 8Z" fill="#FFFFFF"/>
                  </svg>
                `),
                scaledSize: new google.maps.Size(32, 32),
              }
            });
            markersRef.current.push(marker);
          }
        });
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initMap();
  }, [mapLoaded, onLocationChange, setValue]);

  useEffect(() => {
    if (!map) return;
    
    // Set initial location if provided
    if (initialLat && initialLng) {
      const position = { lat: initialLat, lng: initialLng };
      map.setCenter(position);
      
      // Clear existing markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
      
      const marker = new google.maps.Marker({
        position,
        map,
        title: 'Lokalizacja drzewa',
        icon: {
          url: 'data:image/svg+xml;base64,' + btoa(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="15" fill="#DC2626" stroke="#B91C1C" stroke-width="2"/>
              <path d="M16 8L18 14L24 14L19.5 18L21.5 24L16 20.5L10.5 24L12.5 18L8 14L14 14L16 8Z" fill="#FFFFFF"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(32, 32),
        }
      });
      markersRef.current.push(marker);
    } else {
      // Try to get current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            onLocationChange(pos);
            setValue('address', `Współrzędne: ${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`);
            
            map.setCenter(pos);
            
            // Clear existing markers
            markersRef.current.forEach(marker => marker.setMap(null));
            markersRef.current = [];
            
            const marker = new google.maps.Marker({
              position: pos,
              map,
              title: 'Twoja lokalizacja',
              icon: {
                url: 'data:image/svg+xml;base64,' + btoa(`
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="15" fill="#065F46" stroke="#064E3B" stroke-width="2"/>
                    <circle cx="16" cy="16" r="4" fill="#10B981"/>
                    <circle cx="16" cy="16" r="8" stroke="#10B981" stroke-width="2" fill="none"/>
                  </svg>
                `),
                scaledSize: new google.maps.Size(32, 32),
              }
            });
            markersRef.current.push(marker);
          },
          () => {
            // If can't get location, use Rzeszów
            const rzeszowPos = { lat: 50.0412, lng: 21.9991 };
            onLocationChange(rzeszowPos);
            setValue('address', `Współrzędne: ${rzeszowPos.lat.toFixed(6)}, ${rzeszowPos.lng.toFixed(6)}`);
            map.setCenter(rzeszowPos);
          }
        );
      } else {
        // If geolocation not supported, use Rzeszów
        const rzeszowPos = { lat: 50.0412, lng: 21.9991 };
        onLocationChange(rzeszowPos);
        setValue('address', `Współrzędne: ${rzeszowPos.lat.toFixed(6)}, ${rzeszowPos.lng.toFixed(6)}`);
        map.setCenter(rzeszowPos);
      }
    }
  }, [map, initialLat, initialLng, onLocationChange, setValue]);

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Lokalizacja na mapie
      </label>
      <div className="relative bg-gray-100 rounded-lg overflow-hidden">
        <div 
          ref={mapRef} 
          className="w-full h-48"
          style={{ 
            zIndex: 1,
            backgroundColor: '#f3f4f6'
          }}
        />
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Ładowanie mapy...</p>
            </div>
          </div>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Kliknij na mapie, aby zaznaczyć lokalizację drzewa
      </p>
    </div>
  );
};

export default LocationMap;
