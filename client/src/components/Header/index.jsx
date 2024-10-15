import { Link } from 'react-router-dom';
import AuthLinks from './AuthLinks';
import { useState } from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header style={{ backgroundColor: '#A5B68D' }} className="shadow-md sticky top-0 ">
    <nav className="p-4 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <Link to="/" style={{ color: '#DA8359' }} className="text-xl font-bold transition duration-300 hover:scale-110">
          Miles & Memories
        </Link>
        <div style={{ color: '#F8EDED' }} className="hidden md:flex space-x-6">
          <Link to="/" className="text-lg transition duration-300 hover:scale-110">
            Home
          </Link>
          <Link to="/me" className="text-lg transition duration-300 hover:scale-110">
            Profile
          </Link>
          <Link to="/create" className="text-lg transition duration-300 hover:scale-110">
            New Journal
          </Link>
        </div>
      </div>
      
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          style={{ color: '#F8EDED' }} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="focus:outline-none"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Auth Links */}
      <div className='hidden md:flex space-x-6'>
        <AuthLinks style={{ color: '#F8EDED' }} className='hidden md:flex space-x-6'/>
      </div>
    </nav>

    {/* Mobile Menu */}
    {isMobileMenuOpen && (
      <div style={{ backgroundColor: '#A5B68D' }} className="md:hidden bg-white shadow-md">
        <div style={{ color: '#F8EDED' }} className="flex flex-col p-4 space-y-2 items-center">
          <Link to="/" style={{ color: '#F8EDED' }} className="text-lg" onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/me" style={{ color: '#F8EDED' }} className="text-lg" onClick={() => setIsMobileMenuOpen(false)}>
            Profile
          </Link>
          <Link to="/create" style={{ color: '#F8EDED' }} className="text-lg" onClick={() => setIsMobileMenuOpen(false)}>
            New Journal
          </Link>
          <AuthLinks />
        </div>
      </div>
    )}
  </header>
  );
};

export default Header;
