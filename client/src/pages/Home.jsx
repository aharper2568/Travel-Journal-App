import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QUERY_USERS } from '../utils/queries';

const UserLinks = ({ users }) => {
  return (
    <div className="grid grid-cols-12 sm:grid-cols-6 lg:grid-cols-3 gap-6">
      {users?.map(user => (
        <div
          style={{ background: '#FCFAEE' }}
          className="border border-gray-300 rounded-lg shadow-lg p-4"
          key={user._id}
        >
          <p className="text-lg font-semibold">
            <Link to={`/profiles/${user._id}`} className="hover:underline">
              {`${user.username}'s Memory`}
            </Link>
          </p>
          {user.entries.length > 0 ? (
            <div className="entry-preview mt-4">
              <h4 className="text-xl font-bold">{user.entries[0].title}</h4>
              <p className="text-sm">
                <strong>Location:</strong> {user.entries[0].location}
              </p>
              <p className="text-sm">
                <strong>Date:</strong> {user.entries[0].date}
              </p>
              {user.entries[0].picture && (
                <img
                  src={user.entries[0].picture}
                  alt={user.entries[0].title}
                  className="mt-2 rounded-md max-w-full h-48 object-cover"
                />
              )}
            </div>
          ) : (
            <p>No memories available.</p>
          )}
        </div>
      ))}
    </div>
  );
};

const Home = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  const users = data?.users || [];
  
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <main className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 style={{ color: '#DA8359' }} className="text-3xl font-bold text-center mb-6">
        Memories
      </h1>
      
      <form onSubmit={handleSearch} className="mb-12 flex justify-center w-full max-w-md">
        <input
          type="text"
          placeholder="Search by Location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-l-lg"
          style={{ background: '#FCFAEE' }}
        />
        <button
          type="submit"
          className="p-3 text-white rounded-r-lg"
          style={{ background: '#DA8359' }}
        >
          Search
        </button>
      </form>

      <div className="w-full max-w-7xl">
        <UserLinks users={users} />
      </div>
    </main>
  );
};

export default Home;
