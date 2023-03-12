import { useMemo } from 'react'

import { NFTDataType } from '@/shared/types/constants'

interface INftItemProps {
  data: NFTDataType
}

const NftItem: React.FC<INftItemProps> = ({ data }) => {
  const updatedTime = useMemo(
    () => new Date(data.timeLastUpdated).toLocaleDateString('ko-kr'),
    [data.timeLastUpdated],
  )

  return (
    <div className="flex flex-col">
      <img src={data.media?.[0].raw} alt={data.tokenId.toString()} />
      <div className="text-lg mt-2">{`#${data.tokenId}`}</div>
      <div className="text-sm">{data.contractMetadata.name}</div>
      <div className="text-sm text-gray-400">{updatedTime}</div>
    </div>
  )
}

export default NftItem
