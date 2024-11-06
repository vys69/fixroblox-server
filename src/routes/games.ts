import { Router } from 'express';
import { fetchRobloxGameData } from '../api/roblox';
import { createMetaTags } from '../utils/metaTags';
import { createRedirectHtml } from '../utils/html';

const router = Router();

router.get('/:gameId/:gameName?', async (req, res) => {
  const { gameId } = req.params;
  
  try {
    const gameData = await fetchRobloxGameData(gameId);

    const metaTags = createMetaTags({
      title: gameData.name,
      description: gameData.description || 'No description available',
      image: gameData.thumbnailUrl || '',
      url: `https://www.roblox.com/games/${gameId}`,
      // type: 'summary_large_image'
    });

    const html = createRedirectHtml({
      title: gameData.name,
      metaTags,
      redirectUrl: `https://www.roblox.com/games/${gameId}`
    });

    res.send(html);
  } catch (error) {
    console.error('Error fetching game data:', error);
    res.status(500).send('Error fetching game data');
  }
});

export default router;