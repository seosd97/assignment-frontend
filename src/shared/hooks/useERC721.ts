import { Contract, ethers } from 'ethers'
import { Interface } from 'ethers/lib/utils'
import { useEffect, useMemo } from 'react'

import Erc721 from '@/shared/ethers/abi/Erc721Mock.json'

import { TransferEvent } from '../types/constants'

const useERC721 = (
  contractAddress: string,
  transferEvent?: (from: string, to: string, tokenId: number, e: TransferEvent) => void,
): {
  transferFrom: (from: string, to: string, tokenId: number) => Promise<void>
} => {
  const contract = useMemo(() => {
    if (!window.ethereum) return

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const abi = new Interface(Erc721.abi)
    const abiContract = new Contract(contractAddress, abi, signer)
    return abiContract.connect(signer)
  }, [contractAddress])

  useEffect(() => {
    if (!contract || !transferEvent) return
    contract.on('Transfer', transferEvent)

    return () => {
      if (!contract || !transferEvent) return
      console.log('off event')
      contract.off('Transfer', transferEvent)
    }
  }, [contract, transferEvent])

  const transferFrom = async (from: string, to: string, tokenId: number) => {
    await contract?.transferFrom(from, to, tokenId)
  }

  return {
    transferFrom,
  }
}

export default useERC721
