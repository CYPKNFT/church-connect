import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
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
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!isOpen || !mapContainer.current) return;

    // For demo purposes, using a default location (San Francisco)
    // In a real app, you'd geocode the location string
    const defaultCoordinates: [number, number] = [-122.4194, 37.7749];

    // Initialize map
    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZS1kZW1vIiwiYSI6ImNsczJ5eGlkazBpMHAya21ycHpjdTd2ZXAifQ.placeholder';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: defaultCoordinates,
      zoom: 14,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add marker for event location
    const marker = new mapboxgl.Marker({
      color: '#3b82f6',
      scale: 1.2
    })
      .setLngLat(defaultCoordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div class="p-2">
              <h3 class="font-semibold text-sm">${eventTitle}</h3>
              <p class="text-xs text-gray-600 mt-1">${location}</p>
            </div>
          `)
      )
      .addTo(map.current);

    // Show popup by default
    marker.getPopup().addTo(map.current);

    // Cleanup
    return () => {
      map.current?.remove();
      map.current = null;
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