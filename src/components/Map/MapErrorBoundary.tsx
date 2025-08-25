import React from 'react';

interface MapErrorBoundaryProps {
  error: string | null;
}

const MapErrorBoundary = ({ error }: MapErrorBoundaryProps) => {
  if (!error) return null;

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
      backgroundColor: '#f3f4f6',
      zIndex: 1000
    }}>
      <div style={{ textAlign: 'center', color: '#ef4444' }}>
        <p>{error}</p>
      </div>
    </div>
  );
};

export default MapErrorBoundary;
