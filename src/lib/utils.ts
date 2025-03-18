import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

  // Generate user avatar initials
  export const getInitials = (username: string) => {
    if (!username) return 'U';
    const nameParts = username.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return username.substring(0, 2).toUpperCase();
  };