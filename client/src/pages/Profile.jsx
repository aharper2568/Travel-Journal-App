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

  if (!Auth.loggedIn()) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <h4 className="text-lg">
          You need to be logged in to see the profile page. Use the navigation links above to sign up or log in!
        </h4>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 style={{ color: '#DA8359' }} className="text-3xl font-bold mb-4 text-center">
        {id ? `${user.username}'s` : 'Your'} Profile
      </h2>
      {user.entries && user.entries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.entries.map((entry) => (
            <div key={entry._id} style={{ background: '#FCFAEE' }} className="border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-md flex flex-col">
              <h3 className="text-xl font-semibold mb-2">{entry.title}</h3>
              <p className="text-sm mb-1"><strong>Location:</strong> {entry.location}</p>
              <p className="text-sm mb-1"><strong>Date:</strong> {entry.date}</p>
              <p className="text-sm mb-3"><strong>About the memory:</strong> {entry.content}</p>
              {entry.picture && (
                  <img
                    src={entry.picture}
                    alt={entry.title}
                    className="rounded-md border border-gray-200 shadow-sm"
                  />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
        <h4 className="text-lg">
          No memories yet.
        </h4>
      </div>
      )}
    </div>
  );
};

export default Profile;
