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

export const API_ENDPOINT = 'https://lrvalrdo8k.execute-api.us-east-1.amazonaws.com/Prod'

export const LOGIN_DATA_STORAGE_KEY = 'LOGIN_DATA_STORAGE_KEY'
