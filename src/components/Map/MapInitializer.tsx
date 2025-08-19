import { Loader } from '@googlemaps/js-api-loader';
import { fetchMapConfig } from '../../utils/api';
import { MapConfig } from '../../types';

interface MapInitializerProps {
  onMapReady: (map: google.maps.Map) => void;
  onError: (error: string) => void;
}

export const initializeMap = async ({ onMapReady, onError }: MapInitializerProps) => {
  try {
    // Get map configuration from API
    const mapConfig: MapConfig = await fetchMapConfig();
    
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['places'],
      region: mapConfig.region,
      language: mapConfig.language
    });

    await loader.load();
    const { Map } = await google.maps.importLibrary('maps') as google.maps.MapsLibrary;
    
    // TODO: Get default center from backend .NET API GET /api/map/config
    // For now using mock data
    const initialCenter = mapConfig.defaultCenter;

    const mapInstance = new Map(document.createElement('div'), {
      center: initialCenter,
      zoom: mapConfig.defaultZoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    });

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
          console.log('Could not get user location, using default center'+error.message);
        }
      );
    }

    onMapReady(mapInstance);
  } catch (err) {
    console.error('Error loading map:', err);
    onError(`Błąd ładowania mapy: ${err}`);
  }
};
