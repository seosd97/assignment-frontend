export type NonceApiType = {
  id: string
  nonce: string
  publicAddress: string
}

export type TokenApiType = {
  data: {
    access_token: string
  }
}

export type LoginDataType = {
  publicAddress: string
  token: string
  timestamp: number
}

export type NFTDataType = {
  balance: string
  contract: { address: string }
  contractMetadata: {
    contractDeployer: string
    deployedBlockNumber: number
    name: string
    tokenType: string
  }
  description: string
  id: { tokenId: string }
  media: NFTDataMediaType[]
  timeLastUpdated: string
  title: string
  tokenId: number
  tokenUri: string
}

export type NFTDataMediaType = {
  bytes: number
  format: string
  gateway: string
  raw: string
  thumbnail: string
}

export type OwnedNFTApiType = {
  data: {
    ownedNfts: NFTDataType[]
  }
}

export const API_ENDPOINT = 'https://lrvalrdo8k.execute-api.us-east-1.amazonaws.com/Prod'

export const LOGIN_DATA_STORAGE_KEY = 'LOGIN_DATA_STORAGE_KEY'
