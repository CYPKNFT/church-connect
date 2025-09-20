import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface MapLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  location: string;
  eventTitle: string;
}

export const MapLightbox: React.FC<MapLightboxProps> = ({
  isOpen,
  onClose,
  location,
  eventTitle
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!isOpen || !mapContainer.current) return;

    // For demo purposes, using a default location (New York)
    // In a real app, you'd geocode the location string
    const defaultCoordinates: [number, number] = [40.7589, -73.9851];

    // Initialize Leaflet map
    map.current = L.map(mapContainer.current).setView(defaultCoordinates, 14);

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
          width: 30px;
          height: 30px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        ">
          <div style="
            transform: rotate(45deg);
            color: white;
            font-size: 16px;
            text-align: center;
            line-height: 24px;
          ">📍</div>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 30]
    });

    // Add marker with popup
    const marker = L.marker(defaultCoordinates, { icon: customIcon })
      .addTo(map.current)
      .bindPopup(`
        <div style="padding: 8px; text-align: center;">
          <h3 style="font-weight: bold; margin: 0 0 4px 0;">${eventTitle}</h3>
          <p style="margin: 0; color: #666; font-size: 12px;">${location}</p>
          <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${defaultCoordinates[0]},${defaultCoordinates[1]}', '_blank')" 
                  style="margin-top: 8px; padding: 4px 8px; background: #E91E63; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Get Directions
          </button>
        </div>
      `);

    // Add circle overlay
    L.circle(defaultCoordinates, {
      color: '#E91E63',
      fillColor: '#E91E63',
      fillOpacity: 0.2,
      radius: 2000,
      weight: 2
    }).addTo(map.current);

    // Show popup by default
    marker.openPopup();

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [isOpen, location, eventTitle]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[80vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Event Location</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">{location}</p>
        </DialogHeader>
        
        <div className="flex-1 px-6 pb-6">
          <div 
            ref={mapContainer} 
            className="w-full h-full rounded-lg border border-border overflow-hidden"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};