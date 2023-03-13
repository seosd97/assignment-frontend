import { useQuery } from '@tanstack/react-query'

import { getOwnedNFT } from '../types/api'
import { OwnedNFTApiType } from '../types/constants'

const useGetOwnedNFTs = (
  token: string,
): {
  nfts: OwnedNFTApiType | undefined
  isLoading: boolean
} => {
  const { data, isLoading } = useQuery<OwnedNFTApiType>(
    ['nfts', token],
    async () => {
      const { data } = await getOwnedNFT(token)

      return data
    },
    { enabled: !!token },
  )
  return {
    nfts: data,
    isLoading,
  }
}

export default useGetOwnedNFTs
