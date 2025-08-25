export const getStatusIconSVG = (status: string) => {
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

export const getStatusColorInline = (status: string) => {
  switch (status) {
    case 'monument': return 'background: #fef3c7; color: #92400e;';
    case 'approved': return 'background: #dcfce7; color: #166534;';
    case 'pending': return 'background: #fef3c7; color: #92400e;';
    default: return 'background: #dcfce7; color: #166534;';
  }
};

export const getTreeMarkerIcon = (status: string) => {
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

export const getStatusLabel = (status: string) => {
  switch (status) {
    case 'monument': return 'Pomnik przyrody';
    case 'approved': return 'Zatwierdzony';
    case 'pending': return 'Oczekuje weryfikacji';
    default: return 'Drzewo';
  }
};
