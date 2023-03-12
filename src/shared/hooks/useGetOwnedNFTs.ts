import { useQuery } from '@tanstack/react-query'

import { getOwnedNFT } from '../types/api'
import { OwnedNFTApiType } from '../types/constants'

const useGetOwnedNFTs = (token: string): OwnedNFTApiType | undefined => {
  const query = useQuery<OwnedNFTApiType>(
    ['nfts', token],
    async () => {
      const { data } = await getOwnedNFT(token)

      return data
    },
    { enabled: !!token },
  )
  return query.data
}

export default useGetOwnedNFTs
