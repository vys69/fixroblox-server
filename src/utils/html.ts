import { RedirectHtmlProps } from '../types';

export function createRedirectHtml({
  title,
  metaTags,
  redirectUrl
}: RedirectHtmlProps): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        ${metaTags}
        <meta http-equiv="refresh" content="0;url=${redirectUrl}" />
      </head>
      <body>
        Redirecting to ${redirectUrl}...
      </body>
    </html>
  `;
} 