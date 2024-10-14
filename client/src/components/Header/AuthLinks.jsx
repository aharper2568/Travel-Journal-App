import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

const AuthLinks = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  if (Auth.loggedIn()) {
    return (
      <button onClick={logout}>
        Logout
      </button>
    )
  }
  return (
    <>
      <Link to="/login" style={{ color: '#F8EDED' }} className='hidden md:flex space-x-6 transition duration-300 hover:scale-110'>
        Login
      </Link>
      <Link to="/signup" style={{ color: '#F8EDED' }} className='hidden md:flex space-x-6 transition duration-300 hover:scale-110'>
        Signup
      </Link>
    </>
  )
};

export default AuthLinks;
