import { Link, useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="px-8 py-5 border-b-2 border-b-gray-600">
      <Link to="/" className="text-hcPaletteYellow500 text-2xl font-bold">
        KONKRIT
      </Link>
    </div>
  )
}

export default Header
