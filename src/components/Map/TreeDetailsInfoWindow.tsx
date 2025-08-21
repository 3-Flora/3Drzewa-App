import React from 'react';
import { createRoot } from 'react-dom/client';
import { TreeSubmission } from '../../types';
import { getStatusIconSVG, getStatusColorInline, getStatusLabel } from './MapUtils';
import styles from './TreeDetailsInfoWindow.module.css';

interface TreeDetailsInfoWindowProps {
  tree: TreeSubmission;
  onViewDetails: (treeId: string) => void;
}

export const TreeDetailsInfoWindow: React.FC<TreeDetailsInfoWindowProps> = ({ tree, onViewDetails }) => {
  const handleViewDetails = () => {
    onViewDetails(tree.id);
  };

  return (
    <div className={styles.treeDetailsPopup}>
      <div className={styles.treeHeader}>
        <div className={styles.treeInfo}>
          <h3 className={styles.treeSpecies}>{tree.species}</h3>
          <p className={styles.treeLatin}>{tree.speciesLatin}</p>
        </div>
        {tree.images && tree.images.length > 0 && (
          <img 
            src={tree.images[0]} 
            alt={tree.species} 
            className={styles.treeImage}
          />
        )}
      </div>
      
      <div className={styles.treeStatus}>
        {getStatusIconSVG(tree.status)}
        <span 
          className={styles.statusBadge}
          style={getStatusColorInline(tree.status) as React.CSSProperties}
        >
          {getStatusLabel(tree.status)}
        </span>
      </div>
      
      <div className={styles.treeLocation}>
        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <span className={styles.locationText}>{tree.location.address}</span>
      </div>
      
      <p className={styles.treeDescription}>
        {tree.description.length > 80 ? tree.description.substring(0, 80) + '...' : tree.description}
      </p>
      
      <div className={styles.treeFooter}>
        <div className={styles.treeCircumference}>
          Pierśnica: {tree.circumference} cm
        </div>
        <button 
          className={styles.viewDetailsButton}
          onClick={handleViewDetails}
        >
          Zobacz szczegóły
        </button>
      </div>
    </div>
  );
};

// Helper function to render React component in Google Maps InfoWindow
export const renderTreeDetailsInInfoWindow = (
  component: React.ReactElement,
  container: HTMLElement
) => {
  const root = createRoot(container);
  root.render(component);
  return root;
};

// Function to create InfoWindow with React component for tree details
export const createTreeDetailsInfoWindowWithReact = (
  map: google.maps.Map,
  tree: TreeSubmission,
  onViewDetails: (treeId: string) => void
) => {
  // Create a container div for React
  const container = document.createElement('div');
  
  // Create the React component
  const component = (
    <TreeDetailsInfoWindow tree={tree} onViewDetails={onViewDetails} />
  );
  
  // Render React component into the container
  const root = renderTreeDetailsInInfoWindow(component, container);
  
  // Create Google Maps InfoWindow
  const infoWindow = new google.maps.InfoWindow({
    content: container,
    position: { lat: tree.location.lat + 0.0003, lng: tree.location.lng }
  });
  
  // Store root reference for cleanup
  (infoWindow as any).reactRoot = root;
  
  return infoWindow;
};
