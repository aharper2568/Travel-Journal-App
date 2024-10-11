import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = () => {
  const { id } = useParams();

  const { loading, data } = useQuery(
    id ? QUERY_SINGLE_USER : QUERY_ME,
    {
      variables: { id: id },
    }
  );

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data._id === id) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Auth.loggedIn) {
    return (
      <h4>
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <h2>{id ? `${user.username}'s` : 'Your'} profile</h2>
      {user.entries ? (
        <ul className="border">
          {user.entries.map((entry) => (
            <li key={entry._id} className="border my-2 p-2">
              <h3>{entry.title}</h3>
              <p><strong>Location:</strong> {entry.location}</p>
              <p><strong>Date:</strong> {entry.date}</p>
              <p><strong>Content:</strong> {entry.content}</p>
              {entry.picture && (
                <div>
                  <p><strong>Picture:</strong></p>
                  <img 
                    src={entry.picture} 
                    alt={entry.title} 
                    style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'cover' }}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No entries found.</p>
      )}
    </div>
  );
};

export default Profile;
