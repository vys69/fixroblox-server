// User-related types
export interface RobloxUser {
    name: string;
    displayName: string;
    description: string;
    created: string;
    isBanned?: boolean;
    externalAppDisplayName?: string | null;
    hasVerifiedBadge?: boolean;
    id?: number;
  }
  
  export interface RobloxFriends {
    count: number;
  }
  
  export interface RobloxFollowers {
    count: number;
  }
  
  export interface RobloxUserData {
    description: string;
    created: string;
    isBanned: boolean;
    externalAppDisplayName: string | null;
    hasVerifiedBadge: boolean;
    id: number;
    name: string;
    displayName: string;
  }
  
  // Group-related types
  export interface RobloxGroupOwner {
    hasVerifiedBadge: boolean;
    userId: number;
    username: string;
    displayName: string;
  }
  
  export interface RobloxGroup {
    id: number;
    name: string;
    description: string;
    owner: RobloxGroupOwner;
    shout: null | any;
    memberCount: number;
    isBuildersClubOnly: boolean;
    publicEntryAllowed: boolean;
    hasVerifiedBadge: boolean;
  }
  
  // Catalog and Bundle types
  export interface BundleItem {
    id: number;
    name: string;
    type: string;
  }
  
  export interface CatalogItem {
    id: number;
    itemType: 'Asset' | 'Bundle';
    name: string;
    description: string;
    price: number | null;
    creatorName: string;
    creatorType: string;
    creatorTargetId: number;
    productId?: number | null;
    assetType?: number | null;
    bundleType?: string;
    isLimited: boolean;
    isLimitedUnique: boolean;
    collectibleItemType: string | null;
    lowestPrice: number | null;
    priceStatus: string;
    bundleItems?: BundleItem[];
  }
  
  export interface CatalogItemResponse {
    keyword: string | null;
    previousPageCursor: string | null;
    nextPageCursor: string | null;
    data: CatalogItem[];
  }
  
  // Game-related types
  export interface GameThumbnailResponse {
    id: number;
    thumbnailUrl: string;
    name: string;
  }
  
  export interface RobloxGame {
    placeId: number;
    name: string;
    description: string;
    sourceName: string;
    sourceDescription: string;
    url: string;
    builder: string;
    builderId: number;
    hasVerifiedBadge: boolean;
    isPlayable: boolean;
    reasonProhibited: string;
    universeId: number;
    universeRootPlaceId: number;
    price: number;
    imageToken: string;
    thumbnailUrl?: string;
  }
  
  // Third-party API types
  export interface RolimonData {
    rap: number;
    value: number;
  }
  
  // Utility types
  export interface MetaTagsProps {
    title: string;
    description: string;
    image: string;
    url: string;
    oembedTag?: string;
  }
  
  export interface RedirectHtmlProps {
    title: string;
    metaTags: string;
    redirectUrl: string;
  }
  
  export interface UserStats {
    username: string;
    avatarUrl: string;
    statsText: string;
    profileUrl: string;
  }