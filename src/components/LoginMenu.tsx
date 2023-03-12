import { ethers } from 'ethers'
import { useCallback } from 'react'

import useLogin from '@/shared/hooks/useLogin'
import { getNonce, getToken } from '@/shared/types/api'
import { LOGIN_DATA_STORAGE_KEY, LoginDataType } from '@/shared/types/constants'

import { Button } from './design'

const LoginMenu: React.FC = () => {
  const { setLoginData } = useLogin()

  const connectToMetaMask = useCallback(async () => {
    if (!window.ethereum) return false

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    const { data: nonceData } = await getNonce(accounts[0])
    if (!nonceData.nonce) return false

    const signature = await signer.signMessage(nonceData.nonce)
    const { data: token } = await getToken(nonceData.publicAddress, signature)

    const saveData: LoginDataType = {
      publicAddress: nonceData.publicAddress,
      token: token.data.access_token,
      timestamp: Date.now(),
    }
    localStorage.setItem(LOGIN_DATA_STORAGE_KEY, JSON.stringify(saveData))
    setLoginData(saveData)

    return true
  }, [setLoginData])

  return (
    <div className="flex flex-col items-center">
      <Button text="Connect to MetaMask" onClick={connectToMetaMask} />
    </div>
  )
}

export default LoginMenu
