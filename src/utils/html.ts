import { RedirectHtmlProps } from '../types';

export function createRedirectHtml({
  title,
  metaTags,
  redirectUrl
}: RedirectHtmlProps): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title} - Roblox</title>
        ${metaTags}
      </head>
      <body>
        <script>
          window.location.href = "${redirectUrl}";
        </script>
      </body>
    </html>
  `;
} 