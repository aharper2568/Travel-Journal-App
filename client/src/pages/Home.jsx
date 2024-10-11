import { useQuery } from '@apollo/client';

import { QUERY_USERS } from '../utils/queries';
import { Link } from 'react-router-dom';

const UserLinks = ({ users }) => {
  return users?.map(user => (
    <div className="border my-2" key={user._id}>
      <p>
        <Link to={`/profiles/${user._id}`}>{user.username}</Link>
      </p>
      {user.entries.length > 0 ? (
        <div className="entry-preview">
          <h4>{user.entries[0].title}</h4>
          <p><strong>Date:</strong> {user.entries[0].date}</p>
          <p><strong>Location:</strong> {user.entries[0].location}</p>
          <p><strong>Content:</strong> {user.entries[0].content}</p>
          {user.entries[0].picture && (
            <img
              src={user.entries[0].picture}
              alt={user.entries[0].title}
              style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'cover' }}
            />
          )}
         
        </div>
      ) : (
        <p>No entries available.</p>
      )}
    </div>
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
