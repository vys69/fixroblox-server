import { Router } from 'express';
import { fetchBundleData } from '../api/roblox';
import { createMetaTags, createErrorMetaTags } from '../utils/metaTags';
import { createRedirectHtml } from '../utils/html';

const router = Router();

router.get('/:bundleId/:bundleName', async (req, res) => {
  const { bundleId, bundleName } = req.params;

  try {
    const bundleData = await fetchBundleData(bundleId);

    // Validate bundle name
    const encodedBundleName = encodeURIComponent(bundleData.name.replace(/\s+/g, '-'));
    if (bundleName !== encodedBundleName) {
      return res.redirect(`/bundles/${bundleId}/${encodedBundleName}`);
    }

    const bundleIconUrl = `https://www.roblox.com/asset-thumbnail/image?assetId=${bundleId}&width=420&height=420&format=png`;

    const metaTags = createMetaTags({
      title: bundleData.name,
      description: bundleData.description || 'No description available',
      image: bundleIconUrl,
      url: `https://www.roblox.com/bundles/${bundleId}/${encodedBundleName}`,
      type: 'summary_large_image'
    }) + `
      <meta name="roblox:bundle:price" content="${bundleData.price !== null ? `R${bundleData.price}` : 'Off Sale'}">
      <meta name="roblox:bundle:type" content="${bundleData.bundleType}">
    `;

    const html = createRedirectHtml({
      title: `${bundleData.name} - Roblox Bundle`,
      metaTags,
      redirectUrl: `https://www.roblox.com/bundles/${bundleId}/${encodedBundleName}`
    });

    res.send(html);
  } catch (error) {
    console.error('Error fetching bundle:', error);
    const errorHtml = createRedirectHtml({
      title: 'Error - Bundle Not Found',
      metaTags: createErrorMetaTags('The requested Roblox bundle could not be found.'),
      redirectUrl: 'https://www.roblox.com/bundles'
    });
    res.status(404).send(errorHtml);
  }
});

export default router;