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
    const data = localStorage.getItem(LOGIN_DATA_STORAGE_KEY)
    if (!data) return

    setLoginData(JSON.parse(data) as LoginDataType)
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
