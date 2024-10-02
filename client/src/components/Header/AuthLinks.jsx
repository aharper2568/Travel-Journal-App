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
      <Link to="/login">
        Login
      </Link>
      <Link to="/signup">
        Signup
      </Link>
    </>
  )
};

export default AuthLinks;
