import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { NFTDataType } from '@/shared/types/constants'

import { Button } from '../design'

interface INftItemProps {
  data: NFTDataType
}

const NftItem: React.FC<INftItemProps> = ({ data }) => {
  const navigate = useNavigate()

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
      <Button
        className="mt-2"
        text="Send"
        size="xs"
        onClick={() =>
          navigate(`/${data.tokenId}/transfer?contractAddress=${data.contract.address}`)
        }
      />
    </div>
  )
}

export default NftItem
