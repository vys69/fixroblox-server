import axios from 'axios';
import { 
  RobloxUser, 
  RobloxFriends, 
  RobloxFollowers, 
  RobloxGroup,
  CatalogItem,
  RolimonData,
  RobloxGame
} from '../types';

const API_TIMEOUT = 5000;

// Base API configuration
const robloxApi = axios.create({
  timeout: API_TIMEOUT,
  headers: {
    'Accept': 'application/json',
    'User-Agent': 'Mozilla/5.0',
  }
});

// User-related API calls
export async function fetchRobloxUserData(userId: string): Promise<RobloxUser> {
  try {
    const response = await robloxApi.get(`https://users.roblox.com/v1/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Failed to fetch user data');
  }
}

export async function fetchRobloxFriends(userId: string): Promise<RobloxFriends> {
  try {
    const response = await robloxApi.get(`https://friends.roblox.com/v1/users/${userId}/friends/count`);
    return response.data;
  } catch (error) {
    console.error('Error fetching friends count:', error);
    throw new Error('Failed to fetch friends count');
  }
}

export async function fetchRobloxFollowers(userId: string): Promise<RobloxFollowers> {
  try {
    const response = await robloxApi.get(`https://friends.roblox.com/v1/users/${userId}/followers/count`);
    return response.data;
  } catch (error) {
    console.error('Error fetching followers count:', error);
    throw new Error('Failed to fetch followers count');
  }
}

export async function fetchRobloxAvatar(userId: string): Promise<string> {
  try {
    const response = await robloxApi.get(
      `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=png`
    );
    return response.data.data[0].imageUrl;
  } catch (error) {
    console.error('Error fetching avatar:', error);
    return `https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=420&height=420&format=png`;
  }
}

// Group-related API calls
export async function fetchRobloxGroupData(groupId: string): Promise<RobloxGroup> {
  try {
    const response = await robloxApi.get(`https://groups.roblox.com/v1/groups/${groupId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching group data:', error);
    throw new Error('Failed to fetch group data');
  }
}

export async function fetchRobloxGroupIcon(groupId: string): Promise<string> {
  try {
    const response = await robloxApi.get(
      `https://thumbnails.roblox.com/v1/groups/icons?groupIds=${groupId}&size=420x420&format=Png&isCircular=false`
    );
    return response.data.data[0].imageUrl;
  } catch (error) {
    console.error('Error fetching group icon:', error);
    return `https://www.roblox.com/group-thumbnails/image?groupId=${groupId}&width=420&height=420`;
  }
}

// Catalog-related API calls
export async function fetchCatalogItemData(itemId: string): Promise<CatalogItem> {
  try {
    const response = await robloxApi.get(`https://economy.roblox.com/v2/assets/${itemId}/details`);
    const data = response.data;
    
    return {
      id: data.AssetId,
      itemType: 'Asset',
      name: data.Name,
      description: data.Description,
      price: data.PriceInRobux,
      creatorName: data.Creator.Name,
      creatorType: data.Creator.CreatorType,
      creatorTargetId: data.Creator.CreatorTargetId,
      productId: data.ProductId,
      assetType: data.AssetTypeId,
      isLimited: data.IsLimited || data.IsLimitedUnique,
      isLimitedUnique: data.IsLimitedUnique,
      collectibleItemType: data.CollectibleItemType,
      lowestPrice: data.LowestPrice,
      priceStatus: data.PriceStatus
    };
  } catch (error) {
    console.error('Error fetching catalog item data:', error);
    throw new Error('Failed to fetch catalog item data');
  }
}

// Bundle-related API calls
export async function fetchBundleData(bundleId: string): Promise<CatalogItem> {
  try {
    const response = await robloxApi.get(`https://catalog.roblox.com/v1/bundles/${bundleId}/details`);
    const data = response.data;
    
    return {
      id: data.id,
      itemType: 'Bundle',
      name: data.name,
      description: data.description,
      price: data.price,
      creatorName: data.creator.name,
      creatorType: data.creator.type,
      creatorTargetId: data.creator.id,
      bundleType: data.bundleType,
      isLimited: false,
      isLimitedUnique: false,
      collectibleItemType: null,
      lowestPrice: null,
      priceStatus: data.price !== null ? 'For Sale' : 'Off Sale',
      bundleItems: data.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        type: item.type
      }))
    };
  } catch (error) {
    console.error('Error fetching bundle data:', error);
    throw new Error('Failed to fetch bundle data');
  }
}

// Third-party API calls
export async function fetchRolimonData(userId: string): Promise<RolimonData> {
  try {
    const response = await axios.get(`https://api.rolimons.com/players/v1/playerinfo/${userId}`, { timeout: 5000 });
    return {
      rap: response.data.rap || 0,
      value: response.data.value || 0
    };
  } catch (error) {
    console.error('Error fetching Rolimon data:', error);
    return { rap: 0, value: 0 };
  }
}

// Game-related API calls
export async function fetchRobloxGameData(gameId: string): Promise<RobloxGame> {
  try {
    console.log(`[Game API] Fetching game data for ID: ${gameId}`);
    
    if (!process.env.ROBLOSECURITY) {
      console.error('[Game API] CRITICAL: ROBLOSECURITY environment variable is not set!');
      throw new Error('Authentication required');
    }

    const [gameResponse, thumbnailUrl] = await Promise.all([
      robloxApi.get(`https://games.roblox.com/v1/games/multiget-place-details?placeIds=${gameId}`, {
        headers: {
          'Cookie': `.ROBLOSECURITY=${process.env.ROBLOSECURITY}`
        }
      }),
      fetchGameThumbnail(gameId)
    ]);

    if (!gameResponse.data[0]) {
      throw new Error('Game not found');
    }

    return {
      ...gameResponse.data[0],
      thumbnailUrl
    };
  } catch (error) {
    console.error('[Game API] Error:', error);
    throw new Error('Failed to fetch game data');
  }
}

export async function fetchGameThumbnail(gameId: string): Promise<string> {
  try {
    const response = await robloxApi.get(`https://www.roblox.com/item-thumbnails?params=[{assetId:${gameId}}]`);
    if (response.data[0]?.thumbnailUrl) {
      return response.data[0].thumbnailUrl;
    }
    throw new Error('Thumbnail not found');
  } catch (error) {
    console.error('Error fetching game thumbnail:', error);
    return `https://www.roblox.com/asset-thumbnail/image?assetId=${gameId}&width=768&height=432&format=png`;
  }
}