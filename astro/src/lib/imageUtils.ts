/**
 * Get the full image URL for both Strapi Cloud and self-hosted Strapi
 * @param imageUrl - The image URL from Strapi (can be relative or absolute)
 * @param strapiUrl - The base Strapi URL
 * @returns The full image URL
 */
export function getImageUrl(imageUrl: string | null | undefined, strapiUrl: string): string | null {
  if (!imageUrl) return null;
  
  // If the URL is already absolute (starts with http), return as is
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // If relative, prepend the Strapi URL
  return strapiUrl + imageUrl;
}

/**
 * Get the proper link URL with base path support
 * @param url - The URL from Strapi
 * @param baseUrl - The base URL from Astro
 * @returns The full URL with proper base path
 */
export function getLinkUrl(url: string, baseUrl: string): string {
  // If external URL, return as is
  if (url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('tel:')) {
    return url;
  }
  
  // If internal URL, add base path
  if (url.startsWith('/')) {
    return `${baseUrl}${url.slice(1)}`;
  }
  
  return url;
} 