import React from 'react';
import { createRoot } from 'react-dom/client';
import styles from './AddTreeInfoWindow.module.css';

interface AddTreeInfoWindowProps {
  lat: number;
  lng: number;
  onAddTree: (lat: number, lng: number) => void;
  onCancel?: () => void;
}

export const AddTreeInfoWindow: React.FC<AddTreeInfoWindowProps> = ({ 
  lat, 
  lng, 
  onAddTree, 
  onCancel 
}) => {
  const handleAddTree = () => {
    onAddTree(lat, lng);
  };

  return (
    <div className={styles.addTreePopup}>
      <div className={styles.addTreeIcon}>
        <svg width="32" height="32" fill="#16a34a" viewBox="0 0 24 24">
          <path d="M12 2C8 2 4 4 2 8C0 6 -4 6 -6 8C-8 10 -8 14 -6 16C-8 18 -8 22 -4 24C-6 26 -4 30 0 30C-2 34 2 38 6 36C4 40 8 44 12 42C16 44 20 40 18 36C22 38 26 34 24 30C28 30 30 26 28 24C32 22 32 18 30 16C32 14 32 10 30 8C28 6 24 6 22 8C20 4 16 2 12 2Z" transform="translate(12,12) scale(0.4) translate(-12,-12)"/>
        </svg>
      </div>
      
      <h3 className={styles.addTreeTitle}>
        Dodaj nowe drzewo
      </h3>
      
      <p className={styles.addTreeQuestion}>
        Czy chcesz dodać drzewo w tej lokalizacji?
      </p>
      
      <div className={styles.coordinatesContainer}>
        <p className={styles.coordinatesText}>
          {lat.toFixed(6)}, {lng.toFixed(6)}
        </p>
      </div>
      
      <button 
        className={styles.addTreeButton}
        onClick={handleAddTree}
      >
        Dodaj drzewo
      </button>
    </div>
  );
};

// Helper function to render React component in Google Maps InfoWindow
export const renderReactComponentInInfoWindow = (
  component: React.ReactElement,
  container: HTMLElement
) => {
  const root = createRoot(container);
  root.render(component);
  return root;
};

// Function to create InfoWindow with React component
export const createAddTreeInfoWindowWithReact = (
  map: google.maps.Map,
  position: { lat: number; lng: number },
  onAddTree: (lat: number, lng: number) => void
) => {
  // Create a container div for React
  const container = document.createElement('div');
  
  // Create the React component
  const component = (
    <AddTreeInfoWindow
      lat={position.lat}
      lng={position.lng}
      onAddTree={onAddTree}
    />
  );
  
  // Render React component into the container
  const root = renderReactComponentInInfoWindow(component, container);
  
  // Create Google Maps InfoWindow
  const infoWindow = new google.maps.InfoWindow({
    content: container,
    position: { lat: position.lat + 0.0003, lng: position.lng },
    disableAutoPan: false
  });
  
  // Store root reference for cleanup
  (infoWindow as any).reactRoot = root;
  
  return infoWindow;
};
