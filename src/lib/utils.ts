import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// TODO: Add utility functions for image URLs
// Hint: TMDB returns relative paths, you need to construct full image URLs
// Reference: https://developer.themoviedb.org/docs/image-basics

export function getImageUrl(
  path?: string | null,
  size: string = 'original'
): string {
  if (!path) {
    return '/placeholder.png';
  }
  // TODO: Implement image URL construction
  // Use VITE_TMDB_IMAGE_BASE_URL from environment variables
  return `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

// TODO: Add more utility functions as needed
// Examples: formatDate, formatRuntime, etc.
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatRuntime(runtime?: number) {
  if (!runtime) return '-';

  const h = Math.floor(runtime / 60);
  const m = runtime % 60;

  return `${h}h ${m}m`;
}
