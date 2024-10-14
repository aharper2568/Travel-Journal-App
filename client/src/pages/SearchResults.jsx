import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';
import { Link } from 'react-router-dom';

const SearchResults = () => {
  const { location } = useParams();
  const { loading, data } = useQuery(QUERY_USERS);
  const users = data?.users || [];
  
  const filteredUsers = users.map(user => {
    const matchingEntries = user.entries.filter(entry =>
      entry.location.toLowerCase().includes(location.toLowerCase())
    );
    return { ...user, entries: matchingEntries };
  }).filter(user => user.entries.length > 0);

  if (loading) {
    return (
        <p className="text-xl">Loading...</p>
    );
  }

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Search Results for &quot;{location}&quot;</h1>
      
      {filteredUsers.length === 0 ? (
        <p className="text-center">No entries found for the location &quot;{location}&quot;.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map(user => (
            <div style={{ background: '#FCFAEE' }} className="border border-gray-300 rounded-lg p-4 shadow-md" key={user._id}>
              <p style={{ color: '#DA8359' }} className="text-3xl font-bold mb-4">
                <Link to={`/profiles/${user._id}`} className="hover:underline">
                  {user.username}
                </Link>
              </p>
              {user.entries.map(entry => (
                <div className="entry-preview mt-4" key={entry._id}>
                  <h4 className="text-xl font-semibold mb-2">{entry.title}</h4>
                  <p className="text-sm mb-1">
                    <strong>Date:</strong> {entry.date}
                  </p>
                  <p className="text-sm mb-1">
                    <strong>Location:</strong> {entry.location}
                  </p>
                  <p className="text-sm mb-1">
                    <strong>Content:</strong> {entry.content}
                  </p>
                  {entry.picture && (
                     <div className="flex-grow flex items-center justify-center mb-2" style={{ minHeight: '200px' }}>
                     <img
                       src={entry.picture}
                       alt={entry.title}
                       className="rounded-md border border-gray-200 shadow-sm"
                       style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                     />
                   </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default SearchResults;
