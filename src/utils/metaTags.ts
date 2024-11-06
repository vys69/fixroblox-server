import { MetaTagsProps } from '../types';

export function createMetaTags({
  title,
  description,
  image,
  url,
  type = 'summary_large_image',
  siteName = 'FixRoblox'
}: MetaTagsProps): string {
  return `
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${siteName}" />
    <meta name="twitter:card" content="${type}" />
  `;
}

export function createErrorMetaTags(errorMessage: string) {
  return createMetaTags({
    title: 'Error - Roblox Item Not Found',
    description: errorMessage,
    image: 'https://rxblox.com/error-image.png',
    url: 'https://fixroblox.com/error',
    type: 'summary'
  });
} 