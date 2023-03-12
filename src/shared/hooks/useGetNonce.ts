import { useQuery } from '@tanstack/react-query'

import { getNonce } from '../types/api'
import { NonceApiType } from '../types/constants'

const useGetNonce = (address: string): NonceApiType | undefined => {
  const query = useQuery<NonceApiType>(
    ['nonce', address],
    async () => {
      const { data } = await getNonce(address)

      return data
    },
    { enabled: !!address },
  )
  return query.data
}

export default useGetNonce
