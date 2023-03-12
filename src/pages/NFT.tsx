import NftItem from '@/components/NftItem'
import useGetOwnedNFTs from '@/shared/hooks/useGetOwnedNFTs'
import useLogin from '@/shared/hooks/useLogin'

const NFTPage: React.FC = () => {
  const { loginData } = useLogin()
  const nfts = useGetOwnedNFTs(loginData?.token ?? '')

  return (
    <div className="max-w-screen-lg mx-auto mt-32">
      <div className="mb-4 text-2xl font-bold">My NFTs</div>
      <div className="grid grid-cols-6 gap-8 pb-8">
        {nfts?.data.ownedNfts.map(e => (
          <NftItem data={e} />
        ))}
      </div>
    </div>
  )
}

export default NFTPage
