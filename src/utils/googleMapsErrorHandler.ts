/**
 * Utility do obsługi błędów Google Maps związanych z zdarzeniami dotykowymi
 * Te błędy są typowe i nie wpływają na funkcjonalność mapy
 */

// Funkcja do tłumienia błędów Google Maps związanych z touchstart/touchmove
export const suppressGoogleMapsTouchErrors = () => {
  // Sprawdź, czy jesteśmy w środowisku przeglądarki
  if (typeof window === 'undefined') return;

  // Tłumienie błędów związanych z anulowaniem zdarzeń dotykowych
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  console.error = (...args: any[]) => {
    const message = args[0];
    
    // Filtruj błędy Google Maps związane z touchstart/touchmove
    if (typeof message === 'string' && 
        (message.includes('touchstart') || message.includes('touchmove')) &&
        message.includes('cancelable=false')) {
      // Tłum te konkretne błędy - nie wpływają na funkcjonalność
      return;
    }
    
    // Dla wszystkich innych błędów używaj oryginalnej funkcji
    originalConsoleError.apply(console, args);
  };

  console.warn = (...args: any[]) => {
    const message = args[0];
    
    // Filtruj ostrzeżenia Google Maps związane z touchstart/touchmove
    if (typeof message === 'string' && 
        (message.includes('touchstart') || message.includes('touchmove')) &&
        message.includes('cancelable=false')) {
      // Tłum te konkretne ostrzeżenia
      return;
    }
    
    // Dla wszystkich innych ostrzeżeń używaj oryginalnej funkcji
    originalConsoleWarn.apply(console, args);
  };

  // Funkcja do przywrócenia oryginalnych funkcji console
  return () => {
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
  };
};

// Funkcja do dodania globalnych handlerów dla błędów Google Maps
export const addGoogleMapsErrorHandlers = () => {
  if (typeof window === 'undefined') return;

  // Dodaj globalny handler dla błędów związanych z Google Maps
  window.addEventListener('error', (event) => {
    const message = event.message || '';
    
    // Filtruj błędy Google Maps związane z touchstart/touchmove
    if (message.includes('touchstart') || message.includes('touchmove')) {
      // Zapobiegaj domyślnej obsłudze tych błędów
      event.preventDefault();
      return false;
    }
  }, true);

  // Dodaj handler dla unhandledrejection (Promise rejections)
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    
    // Filtruj błędy Google Maps
    if (reason && typeof reason === 'string' && 
        (reason.includes('touchstart') || reason.includes('touchmove'))) {
      // Zapobiegaj domyślnej obsłudze
      event.preventDefault();
      return false;
    }
  });
};

// Funkcja do inicjalizacji wszystkich handlerów błędów Google Maps
export const initGoogleMapsErrorHandling = () => {
  const cleanup = suppressGoogleMapsTouchErrors();
  addGoogleMapsErrorHandlers();
  
  return cleanup;
};
