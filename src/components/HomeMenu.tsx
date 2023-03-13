import { useNavigate } from 'react-router-dom'

import useLogin from '@/shared/hooks/useLogin'

import { Button } from './design'

const HomeMenu: React.FC = () => {
  const { loginData } = useLogin()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center gap-y-3">
      <div className="flex flex-col gap-y-2 mb-7">
        <span>Address</span>
        <span className="px-3 py-2 rounded bg-gray-500">{loginData?.publicAddress}</span>
      </div>
      <Button className="w-56" text="My NFTs" onClick={() => navigate('/nfts')} />
    </div>
  )
}

export default HomeMenu
