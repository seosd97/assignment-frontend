import { ethers } from 'ethers'
import React, { createContext, useEffect, useMemo, useState } from 'react'

import { LOGIN_DATA_STORAGE_KEY, LoginDataType } from '../types/constants'

export interface ILoginContextProps {
  hasMetaMask: boolean
  hasLogin: boolean
  loginData: LoginDataType | null
  warning: string
  setLoginData: (data: LoginDataType | null) => void
}

export const LoginContext = createContext<ILoginContextProps>({
  hasMetaMask: false,
  hasLogin: false,
  loginData: null,
  warning: '',
  setLoginData: () => ({}),
})

const LoginProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loginData, setLoginData] = useState<LoginDataType | null>(null)
  const [warning, setWarning] = useState('')
  const hasLogin = useMemo(() => !!loginData, [loginData])

  useEffect(() => {
    const callback = async (accounts: string[]) => {
      const isSame = loginData?.publicAddress !== (accounts?.[0] ?? '')
      let msg = ''
      if (isSame) msg = 'The connected address is not to same MetaMask'
      setWarning(msg)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    window.ethereum?.on('accountsChanged', callback)

    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Unreachable code error
      window.ethereum?.removeListener('accountsChanged', callback)
    }
  }, [loginData?.publicAddress])

  useEffect(() => {
    const data = localStorage.getItem(LOGIN_DATA_STORAGE_KEY)
    if (!data) return

    const parsedData = JSON.parse(data) as LoginDataType
    setLoginData(parsedData)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    ;(async () => {
      if (!window.ethereum || !loginData?.publicAddress) return

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      try {
        const accounts = await provider.listAccounts()
        const account = accounts?.[0] ?? ''
        console.log(account)
        console.log(account.toLowerCase() !== loginData.publicAddress.toLowerCase())
        if (!account) return

        let msg = ''
        if (account.toLowerCase() !== loginData.publicAddress.toLowerCase()) {
          msg = 'The connected address is not to same MetaMask'
        }
        setWarning(msg)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [loginData?.publicAddress])

  const ctx: ILoginContextProps = {
    hasMetaMask: !!window.ethereum,
    hasLogin,
    loginData,
    warning,
    setLoginData: (data: LoginDataType | null) => setLoginData(data),
  }

  return <LoginContext.Provider value={ctx}>{children}</LoginContext.Provider>
}

export default LoginProvider
