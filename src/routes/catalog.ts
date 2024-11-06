import { Router } from 'express';
import { fetchCatalogItemData } from '../api/roblox';
import { createMetaTags, createErrorMetaTags } from '../utils/metaTags';
import { createRedirectHtml } from '../utils/html';

const router = Router();

router.get('/:assetId', async (req, res) => {
  const assetId = req.params.assetId;

  try {
    // Fetch catalog item data
    const itemData = await fetchCatalogItemData(assetId);

    // Get thumbnail URL based on asset type
    const thumbnailUrl = `https://www.roblox.com/asset-thumbnail/image?assetId=${assetId}&width=420&height=420&format=png`;

    // Format price display
    const priceDisplay = itemData.price !== null 
      ? `R$${new Intl.NumberFormat('en-US').format(itemData.price)}`
      : 'Off Sale';

    // Generate meta tags
    const metaTags = createMetaTags({
      title: itemData.name,
      description: `${itemData.description || 'No description available'} | ${priceDisplay}`,
      image: thumbnailUrl,
      url: `https://www.roblox.com/catalog/${assetId}`
    });

    // Send response
    res.send(createRedirectHtml({
      title: itemData.name,
      metaTags,
      redirectUrl: `https://www.roblox.com/catalog/${assetId}`
    }));

  } catch (error) {
    console.error('Error fetching catalog item data:', error);
    res.status(500).send('Error fetching catalog item data');
  }
});

export default router;