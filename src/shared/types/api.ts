import axios from 'axios'

import { API_ENDPOINT, NonceApiType, TokenApiType } from './constants'

const getNonce = async (publicAddress: string) =>
  await axios.get<NonceApiType>(`${API_ENDPOINT}/users/nonce`, {
    params: {
      publicAddress,
    },
  })

const getToken = async (publicAddress: string, signature: string) =>
  await axios.post<TokenApiType>(`${API_ENDPOINT}/auth/token`, {
    publicAddress,
    signature,
  })

const getOwnedNFT = async (token: string) =>
  await axios.get(`${API_ENDPOINT}/users/nft`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export { getNonce, getOwnedNFT, getToken }
