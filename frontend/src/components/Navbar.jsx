import { Link, useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate();

  const redirect = () => {
    navigate('/create');
  }
  return (
    <nav className='h-[7vh] bg-blue-700 text-white flex justify-between items-center px-5'>
        <Link to="/" className='font-bold text-xl'>Badminton Inventory</Link>
        <ul className='flex items-center gap-5'>
            <li><Link to="/">Home</Link></li>
            <li><button onClick={redirect} className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400">Add Racquet +</button></li>
        </ul>
    </nav>
  )
}

export default Navbar