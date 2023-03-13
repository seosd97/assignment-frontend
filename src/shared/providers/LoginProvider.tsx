import React, { createContext, useEffect, useMemo, useState } from 'react'

import { LOGIN_DATA_STORAGE_KEY, LoginDataType } from '../types/constants'

export interface ILoginContextProps {
  hasMetaMask: boolean
  hasLogin: boolean
  loginData: LoginDataType | null
  setLoginData: (data: LoginDataType | null) => void
}

export const LoginContext = createContext<ILoginContextProps>({
  hasMetaMask: false,
  hasLogin: false,
  loginData: null,
  setLoginData: () => ({}),
})

const LoginProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loginData, setLoginData] = useState<LoginDataType | null>(null)
  const hasLogin = useMemo(() => !!loginData, [loginData])

  useEffect(() => {
    if (!window.ethereum) return
    const callback = (accounts: string[]) => console.log(accounts)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    window.ethereum?.on('accountsChanged', callback)

    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Unreachable code error
      window.ethereum?.removeListener('accountsChanged', callback)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    ;(async () => {
      if (!window.ethereum) return

      const data = localStorage.getItem(LOGIN_DATA_STORAGE_KEY)
      if (!data) return

      // const provider = new ethers.providers.Web3Provider(window.ethereum)
      // const accounts = await provider.listAccounts()
      // const signer = provider.getSigner()
      // const address = await signer.getAddress()

      setLoginData(JSON.parse(data) as LoginDataType)
    })()
  }, [])

  const ctx: ILoginContextProps = {
    hasMetaMask: !!window.ethereum,
    hasLogin,
    loginData,
    setLoginData: (data: LoginDataType | null) => setLoginData(data),
  }

  return <LoginContext.Provider value={ctx}>{children}</LoginContext.Provider>
}

export default LoginProvider
