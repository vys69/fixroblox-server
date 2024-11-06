import { Router } from 'express';
import { fetchCatalogItemData } from '../api/roblox';
import { createMetaTags, createErrorMetaTags } from '../utils/metaTags';
import { createRedirectHtml } from '../utils/html';

const router = Router();

router.get('/:itemId/:itemName', async (req, res) => {
  const { itemId, itemName } = req.params;

  try {
    const itemData = await fetchCatalogItemData(itemId);

    // Validate item name
    const encodedItemName = encodeURIComponent(itemData.name.replace(/\s+/g, '-'));
    if (itemName !== encodedItemName) {
      return res.redirect(`/catalog/${itemId}/${encodedItemName}`);
    }

    const itemIconUrl = `https://www.roblox.com/asset-thumbnail/image?assetId=${itemId}&width=420&height=420&format=png`;

    const metaTags = createMetaTags({
      title: itemData.name,
      description: itemData.description || 'No description available',
      image: itemIconUrl,
      url: `https://www.roblox.com/catalog/${itemId}/${encodedItemName}`,
      type: 'summary_large_image'
    }) + `
      <meta name="roblox:item:price" content="${itemData.price !== null ? `R${itemData.price}` : 'Off Sale'}">
      <meta name="roblox:item:type" content="${itemData.assetType}">
      <meta name="roblox:item:limited" content="${itemData.isLimited ? 'Yes' : 'No'}">
    `;

    const html = createRedirectHtml({
      title: `${itemData.name} - Roblox Catalog Item`,
      metaTags,
      redirectUrl: `https://www.roblox.com/catalog/${itemId}/${encodedItemName}`
    });

    res.send(html);
  } catch (error) {
    console.error('Error fetching catalog item:', error);
    const errorHtml = createRedirectHtml({
      title: 'Error - Item Not Found',
      metaTags: createErrorMetaTags('The requested Roblox item could not be found.'),
      redirectUrl: 'https://www.roblox.com/catalog'
    });
    res.status(404).send(errorHtml);
  }
});

export default router;