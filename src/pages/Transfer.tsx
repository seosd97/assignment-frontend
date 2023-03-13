import { isAddress } from 'ethers/lib/utils'
import queryString from 'query-string'
import { ChangeEvent, useCallback, useState } from 'react'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/design'
import Header from '@/components/Header'
import useERC721 from '@/shared/hooks/useERC721'
import useLogin from '@/shared/hooks/useLogin'
import { TransferEvent } from '@/shared/types/constants'

const invalidInputClasses = ' border-1 border-solid border-red-600'

type FormValues = {
  targetAddress: string
}

const buildTransferErrorMessage = (code: string) => {
  switch (code) {
    case 'UNPREDICTABLE_GAS_LIMIT':
      return 'caller is not token owner or approved (check: https://links.ethers.org/v5-errors-UNPREDICTABLE_GAS_LIMIT)'
    case 'ACTION_REJECTED':
      return 'user rejected transaction'
    default:
      return `failed transaction - [code: ${code}]`
  }
}

const TransferPage: React.FC = () => {
  const { id } = useParams()
  const { search } = useLocation()
  const navigate = useNavigate()
  const tokenId = id as unknown as number
  const contractAddress = queryString.parse(search).contractAddress as string

  const [targetAddr, setTargetAddr] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [sendError, setSendError] = useState<string | null>()
  const [transactionHash, setTransactionHash] = useState<string | null>(null)

  const transferCallback = useCallback(
    (to: string, from: string, tId: number, e: TransferEvent) => {
      setTransactionHash(e.transactionHash)
      setIsSending(false)
    },
    [],
  )

  const { loginData } = useLogin()
  const { transferFrom } = useERC721(contractAddress, transferCallback)

  const validateTargetAddress = useCallback(
    (address: string) => {
      if (!address) return false
      if (!isAddress(address)) return false
      if (loginData?.publicAddress === address) return false
      return true
    },
    [loginData?.publicAddress],
  )

  const formResolver: Resolver<FormValues> = useCallback(
    async values => ({
      values,
      errors: !validateTargetAddress(values.targetAddress)
        ? { targetAddress: { type: 'validate', message: 'Please enter valid address' } }
        : {},
    }),
    [validateTargetAddress],
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: formResolver, mode: 'all' })

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    async data => {
      if (!loginData?.publicAddress) return

      setIsSending(true)
      setSendError(null)
      try {
        await transferFrom(loginData.publicAddress, data.targetAddress, tokenId)
      } catch (err: any) {
        setSendError(buildTransferErrorMessage(err.code))
        setIsSending(false)
      }
    },
    [loginData, tokenId, transferFrom],
  )

  const isValidTargetAddress = !errors.targetAddress

  return (
    <>
      <Header />
      <div className="max-w-screen-lg mx-auto mt-32">
        <div className="mb-4 text-2xl font-bold">Transfer NFTs</div>

        {transactionHash ? (
          <div>
            <span className="text-xl font-semibold">Success to send your NFT</span>
            <div className="flex flex-col mt-5">
              <span>Check your transaction</span>
              <a
                className=" text-blue-500 underline"
                href={`https://goerli.etherscan.io/tx/${transactionHash}`}
                target="_blank"
                rel="noreferrer">
                {`https://goerli.etherscan.io/tx/${transactionHash}`}
              </a>
            </div>
            <Button className="mt-10" text="My NFTs" onClick={() => navigate('/nfts')} />
          </div>
        ) : (
          <>
            <div className="flex flex-col">
              <div className="mt-1 rounded text-opacity-50 text-lg">{`Token ID: ${tokenId}`}</div>
              <div className="mt-1 rounded text-opacity-50 text-lg">{`Contract Address: ${contractAddress}`}</div>
            </div>
            <form className="flex flex-col gap-y-8 mt-5" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="flex items-center">Target Address</label>
                <input
                  type="text"
                  className={`mt-1 rounded text-textBlack w-full disabled:opacity-40 disabled:text-opacity-40 ${
                    !isValidTargetAddress && invalidInputClasses
                  }`}
                  value={targetAddr}
                  {...register('targetAddress', {
                    onChange: (e: ChangeEvent<HTMLInputElement>) => setTargetAddr(e.target.value),
                  })}
                  required
                  disabled={isSending}
                />
                {!isValidTargetAddress && (
                  <div className=" text-sm text-red-600">{errors.targetAddress?.message}</div>
                )}
              </div>

              <div>
                {sendError && <div className=" text-sm text-red-600">{sendError}</div>}
                <input
                  type="submit"
                  className="bg-bgQuarternary enabled:hover:bg-bgButtonHover enabled:hover:cursor-pointer disabled:opacity-40 rounded h-12 w-full"
                  value={isSending ? 'Sending...' : 'Send'}
                  disabled={isSending || !targetAddr || !!errors.targetAddress}
                />
              </div>
            </form>
          </>
        )}
      </div>
    </>
  )
}

export default TransferPage
