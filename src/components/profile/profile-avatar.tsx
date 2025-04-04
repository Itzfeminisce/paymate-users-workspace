import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import React from "react";

interface ProfileAvatarProps {
  imageUrl?: string;
  initials: string;
  onImageUpload?: (file: File | null) => void;
  isPending: boolean;
}

export function ProfileAvatar({ imageUrl, initials, onImageUpload, isPending }: ProfileAvatarProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImageUpload) {
      onImageUpload(file);
    } else {
      onImageUpload(null);
    }

  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {isPending ? (
          <div className="h-32 w-32 bg-gray-200 animate-pulse rounded-full"></div>
        ) : (
          <Avatar className="h-32 w-32">
            <AvatarImage src={imageUrl} />
            <AvatarFallback className="bg-primary text-white text-4xl">
              {initials}
            </AvatarFallback>
          </Avatar>
        )}
        <Button
          variant="secondary"
          size="icon"
          className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-md"
          onClick={handleButtonClick}
        >
          <Camera className="h-4 w-4" />
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/jpg, image/webp"
          className="hidden"
        />
      </div>
      <p className="mt-4 text-muted-foreground text-sm text-center">
        <span className="block mb-1">Click the camera to update your picture</span>
        <span className="text-xs opacity-70 italic">(png, jpeg, jpg, webp)</span>
      </p>
    </div>
  );
} 