import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="flex gap-8 bg-white border-b border-gray-200 p-2.5">
      <Link to="/" className="flex items-center">
        <div className="w-15 h-15 rounded-full border-2 border-[#B53E03] bg-white flex items-center justify-center mr-2">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-11 h-11 object-contain"
          />
        </div>
      </Link>
    </nav>
  )
}
