import { Router } from 'express';
import { fetchRobloxGroupData, fetchRobloxGroupIcon } from '../api/roblox';
import { createMetaTags } from '../utils/metaTags';
import { createRedirectHtml } from '../utils/html';

const router = Router();

router.get('/:groupId/:groupName?', async (req, res) => {
  const groupId = req.params.groupId;
  let groupName = req.params.groupName || '';

  try {
    const [groupData, groupIcon] = await Promise.all([
      fetchRobloxGroupData(groupId),
      fetchRobloxGroupIcon(groupId)
    ]);

    // Handle group name
    if (!groupName || groupName !== encodeURIComponent(groupData.name.replace(/\s+/g, '-'))) {
      groupName = encodeURIComponent(groupData.name.replace(/\s+/g, '-'));
    }

    const metaTags = createMetaTags({
      title: groupData.name,
      description: groupData.description || 'No description available',
      image: groupIcon,
      url: `https://www.roblox.com/groups/${groupId}/${groupName}`
    }) + `
      <meta name="roblox:group:members" content="${groupData.memberCount}">
      <meta name="roblox:group:owner" content="${groupData.owner.displayName} (@${groupData.owner.username})">
    `;

    const html = createRedirectHtml({
      title: `${groupData.name} - Roblox Group`,
      metaTags,
      redirectUrl: `https://www.roblox.com/groups/${groupId}/${groupName}`
    });

    res.send(html);
  } catch (error) {
    console.error('Error fetching group data:', error);
    res.status(500).send('Error fetching group data');
  }
});

export default router; 