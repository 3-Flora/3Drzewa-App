import { TreeSubmission } from '../../types';
import { getTreeMarkerIcon, getStatusIconSVG, getStatusColorInline, getStatusLabel } from './MapUtils';

interface TreeMarkersProps {
  map: google.maps.Map;
  trees: TreeSubmission[];
  onTreeClick: (tree: TreeSubmission) => void;
}

export const addTreeMarkers = ({ map, trees, onTreeClick }: TreeMarkersProps) => {
  const markers: google.maps.Marker[] = [];
  
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
      onTreeClick(tree);
    });
    
    markers.push(marker);
  });
  
  return markers;
};

export const createTreeDetailsContent = (tree: TreeSubmission) => {
  return `
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
};
