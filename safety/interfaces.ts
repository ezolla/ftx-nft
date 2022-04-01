export interface Collection {
  group_type: string
  group_id: string
  total: number
  volume: number
  first_nft: FirstNft
  issuer: Issuer
  collectionDict: CollectionDict
}

interface FirstNft {
  id: string
  name: string
  description: string
  issuer: string
  collection: string
  series: string
  solMintAddress: any
  ethContractAddress: string
  ethTokenId: string
  ethContractType: string
  imageUrl: string
  videoUrl: any
  animationUrl: any
  thumbnailUrl: any
  attributes: Attributes
  attributesList: AttributesList[]
  number: any
  totalQuantity: any
  redeemable: boolean
  redeemed: boolean
  offerPrice: any
  donation: boolean
  status: string
  needsListingFee: boolean
  created_at: string
  createdAt: string
  quoteCurrency: string
  auction: any
  minNextBid: number
  depositMethods: string[]
  withdrawalMethods: any[]
  totalSellerFeeRate: number
  royaltyFeeRate: number
  userReason: any
  userNotes: any
  useCloudflare: boolean
  hasOwner: boolean
  fungible: boolean
  mintSource: string
  minBidNotification: any
}

interface Attributes {
  [key: string]: string
}

interface AttributesList {
  value: string
  trait_type: string
}

interface Issuer {
  id: number
  time: string
  status: string
  issuer: string
  isVerified: boolean
  mintSource: string
  createdAt: number
}

interface CollectionDict {
  id: number
  name: string
  displayName: string
  twitterUrl: string
  discordUrl: string
  homepageUrl: string
  description: string
  markdownDescription: any
  createdAt: number
  featured: boolean
  position: number
  avatarImageUrl: string
  avatarImageId: number
  bannerImageUrl: string
  bannerImageId: number
  cardImageUrl: string
  cardImageId: number
}

export interface CollectionDetails {
  collection: string
  collectionDict: CollectionDict
  floor_price: number
  floor_price_currency: string
  total: number
  volume: number
  open_auctions: number
  isVerified: boolean
  mintSource: string
  nftPack: any
  nftPackRemaining: any
}

export interface CollectionNft {
  id: string
  name: string
  description: string
  issuer: string
  collection: string
  series: any
  solMintAddress: any
  ethContractAddress: any
  ethTokenId: any
  ethContractType: any
  imageUrl: string
  videoUrl: any
  animationUrl: string
  thumbnailUrl: any
  attributes: Attributes
  attributesList: AttributesList[]
  number: any
  totalQuantity: any
  redeemable: boolean
  redeemed: boolean
  offerPrice?: number
  donation: boolean
  status: string
  needsListingFee: boolean
  created_at: string
  createdAt: string
  quoteCurrency: string
  auction?: Auction
  minNextBid: number
  depositMethods: any[]
  withdrawalMethods: string[]
  totalSellerFeeRate: number
  royaltyFeeRate: number
  userReason: any
  userNotes: any
  useCloudflare: boolean
  hasOwner: boolean
  fungible: boolean
  mintSource: string
  minBidNotification: number
}

interface Auction {
  bestBid?: number
  minNextBid: number
  endTime?: string
  bids?: number
  bidTime?: string
}
