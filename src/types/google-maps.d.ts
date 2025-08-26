declare namespace google.maps {
  namespace marker {
    class AdvancedMarkerElement extends google.maps.MVCObject {
      constructor(options?: {
        position?: google.maps.LatLng | google.maps.LatLngLiteral;
        map?: google.maps.Map;
        title?: string;
        content?: Element;
      });
      
      position: google.maps.LatLng | null;
      map: google.maps.Map | null;
      title: string | null;
      content: Element | null;
      
      addListener(eventName: string, handler: Function): google.maps.MapsEventListener;
    }
  }
  
  interface MarkerLibrary {
    AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement;
  }
}
