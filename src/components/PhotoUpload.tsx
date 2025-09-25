import { useState, useCallback } from "react";
import { Upload, X, Image } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface PhotoUploadProps {
  onPhotosChange: (photos: File[]) => void;
  maxPhotos?: number;
  maxFileSize?: number; // in MB
}

export function PhotoUpload({ onPhotosChange, maxPhotos = 5, maxFileSize = 5 }: PhotoUploadProps) {
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select only image files (PNG, JPG, WEBP)");
      return false;
    }

    // Check file size (convert MB to bytes)
    if (file.size > maxFileSize * 1024 * 1024) {
      toast.error(`File size must be less than ${maxFileSize}MB`);
      return false;
    }

    return true;
  };

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return;

    const validFiles: File[] = [];
    const totalFilesAfterAddition = selectedPhotos.length + files.length;

    if (totalFilesAfterAddition > maxPhotos) {
      toast.error(`You can only upload up to ${maxPhotos} photos`);
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (validateFile(file)) {
        validFiles.push(file);
      }
    }

    if (validFiles.length > 0) {
      const newPhotos = [...selectedPhotos, ...validFiles];
      setSelectedPhotos(newPhotos);
      onPhotosChange(newPhotos);
    }
  }, [selectedPhotos, maxPhotos, maxFileSize, onPhotosChange]);

  const removePhoto = (index: number) => {
    const newPhotos = selectedPhotos.filter((_, i) => i !== index);
    setSelectedPhotos(newPhotos);
    onPhotosChange(newPhotos);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  return (
    <div className="space-y-4">
      {/* Photo Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer ${
          isDragOver
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-muted-foreground/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('photo-input')?.click()}
      >
        <input
          id="photo-input"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
        />
        
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, WEBP up to {maxFileSize}MB • Max {maxPhotos} photos
            </p>
          </div>
        </div>
      </div>

      {/* Selected Photos Preview */}
      {selectedPhotos.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Selected Photos ({selectedPhotos.length}/{maxPhotos})</p>
          <div className="grid grid-cols-3 gap-2">
            {selectedPhotos.map((photo, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removePhoto(index)}
                >
                  <X className="w-3 h-3" />
                </Button>
                <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                  {Math.round(photo.size / 1024)}KB
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}