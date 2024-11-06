import { Router } from 'express';
import { fetchBundleData } from '../api/roblox';
import { createMetaTags } from '../utils/metaTags';
import { createRedirectHtml } from '../utils/html';

const router = Router();

router.get('/:bundleId/:bundleName?', async (req, res) => {
  const { bundleId, bundleName } = req.params;

  try {
    // Fetch bundle data
    const bundleData = await fetchBundleData(bundleId);

    // Format bundle name for URL
    const encodedBundleName = encodeURIComponent(bundleData.name.replace(/\s+/g, '-').toLowerCase());

    // Redirect if bundle name doesn't match or is missing
    if (!bundleName || bundleName !== encodedBundleName) {
      return res.redirect(`/bundles/${bundleId}/${encodedBundleName}`);
    }

    // Format price display
    const priceDisplay = bundleData.price !== null 
      ? `R$${new Intl.NumberFormat('en-US').format(bundleData.price)}`
      : 'Off Sale';

    // Get bundle thumbnail
    const thumbnailUrl = `https://www.roblox.com/asset-thumbnail/image?assetId=${bundleId}&width=420&height=420&format=png`;

    // Create description with price and bundle type
    const description = [
      bundleData.description || 'No description available',
      `Price: ${priceDisplay}`,
      `Type: ${bundleData.bundleType}`
    ].join(' | ');

    // Generate meta tags
    const metaTags = createMetaTags({
      title: bundleData.name,
      description,
      image: thumbnailUrl,
      url: `https://www.roblox.com/bundles/${bundleId}/${encodedBundleName}`
    });

    // Send response
    res.send(createRedirectHtml({
      title: `${bundleData.name} - Roblox Bundle`,
      metaTags,
      redirectUrl: `https://www.roblox.com/bundles/${bundleId}/${encodedBundleName}`
    }));

  } catch (error) {
    console.error('Error fetching bundle data:', error);
    
    // Generate error meta tags
    const metaTags = createMetaTags({
      title: 'Bundle Not Found',
      description: 'The requested Roblox bundle could not be found.',
      image: 'https://rxblox.com/error-image.png',
      url: 'https://www.roblox.com/bundles'
    });

    // Send error response
    res.status(404).send(createRedirectHtml({
      title: 'Error - Bundle Not Found',
      metaTags,
      redirectUrl: 'https://www.roblox.com/bundles'
    }));
  }
});

export default router;