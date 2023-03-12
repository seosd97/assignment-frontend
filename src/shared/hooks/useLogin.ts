import { useContext } from 'react'

import { ILoginContextProps, LoginContext } from '../providers/LoginProvider'

const useLogin = (): ILoginContextProps => useContext(LoginContext)

export default useLogin
