import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { MapPin, Maximize2 } from 'lucide-react';

interface MapPreviewProps {
  location: string;
  onExpand: () => void;
  className?: string;
}

export const MapPreview: React.FC<MapPreviewProps> = ({
  location,
  onExpand,
  className = ""
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // For demo purposes, using a default location (San Francisco)
    // In a real app, you'd geocode the location string
    const defaultCoordinates: [number, number] = [-122.4194, 37.7749];

    // Initialize map with a real Mapbox token (you can replace this with your own)
    mapboxgl.accessToken = 'pk.eyJ1IjoidGVzdGluZ21hcGJveCIsImEiOiJjbDl3a2JieGQwZDl5M3BvNHFxNHFvaGJ4In0.Z9OPVgwJqMBdSr6P6H6TKg';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: defaultCoordinates,
      zoom: 13,
      interactive: false, // Disable interaction for preview
    });

    // Add simple marker
    new mapboxgl.Marker({
      color: '#3b82f6',
      scale: 0.8
    })
      .setLngLat(defaultCoordinates)
      .addTo(map.current);

    // Cleanup
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [location]);

  return (
    <div className={`relative group ${className}`}>
      <div 
        ref={mapContainer} 
        className="w-full h-full rounded-lg border border-border overflow-hidden cursor-pointer"
        onClick={onExpand}
      />
      
      {/* Overlay with expand button */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg">
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-sm"
            onClick={onExpand}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Location label - only show for larger maps */}
        {!className?.includes('rounded-full') && (
          <div className="absolute bottom-2 left-2 right-2">
            <div className="bg-white/90 backdrop-blur-sm rounded px-2 py-1 text-xs font-medium text-gray-800 truncate flex items-center gap-1">
              <MapPin className="h-3 w-3 text-blue-600 shrink-0" />
              {location}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};