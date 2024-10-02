import { useQuery } from '@apollo/client';

import { QUERY_USERS } from '../utils/queries';
import { Link } from 'react-router-dom';

const UserLinks = ({ users }) => {
  return users?.map(user => (
    <p key={user._id}>
      <Link to={`/profiles/${user._id}`}>{user.username}</Link>
    </p>
  ));
}

const Home = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  const users = data?.users || [];

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <main>
      <UserLinks users={users} />
    </main>
  );
};

export default Home;
