import { Router } from 'express';
import { 
  fetchRobloxUserData, 
  fetchRobloxFriends, 
  fetchRobloxFollowers, 
  fetchRobloxAvatar,
  fetchRolimonData 
} from '../api/roblox';
import { createMetaTags } from '../utils/metaTags';
import { createRedirectHtml } from '../utils/html';

const router = Router();

router.get('/:userId/profile', async (req, res) => {
  const userId = req.params.userId;

  try {
    const [userData, friendsData, followersData, avatarUrl, rolimonData] = await Promise.all([
      fetchRobloxUserData(userId),
      fetchRobloxFriends(userId),
      fetchRobloxFollowers(userId),
      fetchRobloxAvatar(userId),
      fetchRolimonData(userId)
    ]);

    // Format stats
    const formattedValue = new Intl.NumberFormat('en-US').format(rolimonData.value);
    const robuxValue = `R${formattedValue}`;
    const formattedFriends = new Intl.NumberFormat('en-US').format(friendsData.count);
    const formattedFollowers = new Intl.NumberFormat('en-US').format(followersData.count);
    const statsText = `${formattedFriends} friends, ${formattedFollowers} followers, ${robuxValue} robux`;

    const profileUrl = `https://www.roblox.com/users/${userId}/profile`;

    const metaTags = createMetaTags({
      title: `${userData.name}'s Roblox Profile`,
      description: statsText,
      image: avatarUrl,
      url: profileUrl
    });

    const redirectHtml = createRedirectHtml({
      title: `${userData.name}'s Profile - FixRoblox`,
      metaTags,
      redirectUrl: profileUrl
    });

    res.send(redirectHtml);
  } catch (error) {
    console.error('Error fetching Roblox data:', error);
    res.status(500).send('Error fetching Roblox data');
  }
}); 

export default router; 