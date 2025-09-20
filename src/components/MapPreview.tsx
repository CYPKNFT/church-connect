import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
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
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // For demo purposes, using a default location (New York)
    // In a real app, you'd geocode the location string
    const defaultCoordinates: [number, number] = [40.7589, -73.9851];

    // Initialize Leaflet map
    map.current = L.map(mapContainer.current, {
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      touchZoom: false,
      doubleClickZoom: false,
      scrollWheelZoom: false,
      boxZoom: false,
      keyboard: false
    }).setView(defaultCoordinates, 13);

    // Add OpenStreetMap tiles (free)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(map.current);

    // Custom marker icon
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background-color: #E91E63;
          width: 20px;
          height: 20px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ">
          <div style="
            transform: rotate(45deg);
            color: white;
            font-size: 10px;
            text-align: center;
            line-height: 16px;
          ">📍</div>
        </div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 20]
    });

    // Add marker
    L.marker(defaultCoordinates, { icon: customIcon }).addTo(map.current);

    // Add circle overlay
    L.circle(defaultCoordinates, {
      color: '#E91E63',
      fillColor: '#E91E63',
      fillOpacity: 0.2,
      radius: 1500,
      weight: 2
    }).addTo(map.current);

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
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