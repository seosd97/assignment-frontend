import { useMemo } from 'react'

import HomeMenu from '@/components/HomeMenu'
import LoginMenu from '@/components/LoginMenu'
import useLogin from '@/shared/hooks/useLogin'

const Home: React.FC = () => {
  const { hasMetaMask, hasLogin } = useLogin()
  const MenuComponent = useMemo(() => (hasLogin ? <HomeMenu /> : <LoginMenu />), [hasLogin])

  return (
    <div className="flex flex-col items-center">
      <h1 className="my-36 font-bold text-5xl text-hcPaletteYellow500">KONKRIT</h1>
      {hasMetaMask ? (
        MenuComponent
      ) : (
        <div className="flex flex-col items-center">
          <span>Can't not find MetaMask.</span>
          <span>Please install first MetaMask on your browser.</span>
        </div>
      )}
    </div>
  )
}

export default Home
