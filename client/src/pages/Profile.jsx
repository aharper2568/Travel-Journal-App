import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_USER, QUERY_ME, QUERY_ENTRIES } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { id } = useParams();

  // If there is no `id` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    id ? QUERY_SINGLE_USER : QUERY_ME,
    {
      variables: { id: id },
    }
  );

  const { loading: entriesLoading, error: entriesError, data: entriesData, refetch: refetchEntries } = useQuery(QUERY_ENTRIES);

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const user = data?.me || data?.user || {};

  // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
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
    <h2>
      {id ? `${user.username}'s` : 'Your'} profile
    </h2>
    <h2>Entries:</h2>
      {entriesLoading ? <p>Loading entries...</p> : (
        <ul className="border">
          {entriesData?.entries?.map((entry) => (
            <li key={entry._id} className="border my-2 p-2">
              <h3>{entry.title}</h3>
              <p><strong>Location:</strong> {entry.location}</p>
              <p><strong>Date:</strong> {entry.date}</p>
              <p><strong>Content:</strong> {entry.content}</p>
              {/* <button onClick={() => handleDeleteEntry(entry._id)}>Delete Entry</button> */}
            </li>
          ))}
        </ul>
      )}
      {entriesError && <p>Error loading entries: {entriesError.message}</p>}
    </div>
  );
};

export default Profile;
