interface AddTreeInfoWindowProps {
  lat: number;
  lng: number;
  onAddTree: (lat: number, lng: number) => void;
  onCancel: () => void;
}

export const createAddTreeContent = ({ lat, lng, onAddTree, onCancel }: AddTreeInfoWindowProps) => {
  return `
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
};

export const createAddTreeInfoWindow = (
  map: google.maps.Map,
  position: { lat: number; lng: number },
  content: string
) => {
  return new google.maps.InfoWindow({
    content,
    position: { lat: position.lat + 0.0003, lng: position.lng },
    disableAutoPan: false
  });
};
