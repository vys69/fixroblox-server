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
    const createdYear = new Date(userData.created).getFullYear();
    const formattedValue = new Intl.NumberFormat('en-US').format(rolimonData.value);
    const robuxValue = `R${formattedValue}`;
    const formattedFriends = new Intl.NumberFormat('en-US').format(friendsData.count);
    const formattedFollowers = new Intl.NumberFormat('en-US').format(followersData.count);
    const statsText = encodeURIComponent(`👤 ${formattedFriends}   👥 ${formattedFollowers}   💰 ${robuxValue}   📅 ${createdYear}`);

    const profileUrl = `https://www.roblox.com/users/${userId}/profile`;

    const metaTags = createMetaTags({
      title: `${userData.displayName} (@${userData.name})`,
      description: statsText,
      image: avatarUrl,
      url: profileUrl
    });

    const redirectHtml = createRedirectHtml({
      title: `${userData.displayName} (@${userData.name})`,
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