import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_PROFILE, LOGIN_USER, ADD_ENTRY, REMOVE_PROFILE, REMOVE_ENTRY } from '../utils/mutations';
import { QUERY_USERS, QUERY_ME, QUERY_ENTRIES } from '../utils/queries';
import { useNavigate } from 'react-router-dom'; // If using redirection

const TestComponent = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    isAdmin: '',
    title: '',
    content: '',
    location: '',
    date: ''
  });

  const { loading: usersLoading, error: usersError, data: usersData, refetch: refetchUsers } = useQuery(QUERY_USERS);
  const { loading: meLoading, error: meError, data: meData } = useQuery(QUERY_ME);
  const { loading: entriesLoading, error: entriesError, data: entriesData, refetch: refetchEntries } = useQuery(QUERY_ENTRIES);

  const [addUser] = useMutation(ADD_PROFILE);
  const [loginUser] = useMutation(LOGIN_USER);
  const [addEntry] = useMutation(ADD_ENTRY);
  const [deleteUser] = useMutation(REMOVE_PROFILE);
  const [deleteEntry] = useMutation(REMOVE_ENTRY);

  const navigate = useNavigate();


  useEffect(() => {
    if (!meLoading && meData && !meData.me.isAdmin) {

      navigate('/');
    }
  }, [meLoading, meData, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleAddUser = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { username: formState.username, email: formState.email, password: formState.password, isAdmin: formState.isAdmin },
      });
      console.log(data);
      refetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginUser = async (event) => {
    event.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { email: formState.email, password: formState.password },
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddEntry = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addEntry({
        variables: {
          title: formState.title,
          location: formState.location,
          date: formState.date,
          content: formState.content
        },
      });
      console.log(data);
      refetchEntries();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser({ variables: { _id: userId } });
      refetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEntry = async (entryId) => {
    try {
      await deleteEntry({ variables: { entryId } });
      refetchEntries();
    } catch (error) {
      console.error(error);
    }
  };

  if (meLoading) return <p>Loading...</p>;
  if (!meData?.me?.isAdmin) return <p>Access Denied</p>;

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Only Component</h1>

      <div className="mb-8">
        <h2 className="text-2xl mb-4">Users:</h2>
        {usersLoading ? (
          <p>Loading users...</p>
        ) : (
          <ul className="space-y-4">
            {usersData?.users?.map((user) => (
              <li key={user._id} className="p-4 border border-gray-300 rounded flex justify-between">
                <span>
                  <span>{user.username}</span> ({user.email}) - Admin: {user.isAdmin ? 'Yes' : 'No'}
                </span>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded"
                >
                  Delete User
                </button>
              </li>
            ))}
          </ul>
        )}
        {usersError && <p className="text-red-500">Error loading users: {usersError.message}</p>}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl mb-4">My Info:</h2>
        <div className="p-4 border border-gray-300 rounded">
          <p className="mb-2"><strong>Username:</strong> {meData?.me?.username}</p>
          <p><strong>Email:</strong> {meData?.me?.email}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl mb-4">Add User</h2>
        <form onSubmit={handleAddUser} className="space-y-4">
          <input
            type="text"
            name="username"
            value={formState.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <h3 className="ml-2">Is the user an Admin?</h3>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isAdmin"
              checked={formState.isAdmin === true}
              onChange={(e) => handleChange({ target: { name: e.target.name, value: e.target.checked } })}
              className="w-4 h-4 border border-gray-300 rounded"
            />
            <label htmlFor="isAdmin" className="ml-2 text-gray-700">True or False</label>
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Add User
          </button>
        </form>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl mb-4">Login</h2>
        <form onSubmit={handleLoginUser} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Login
          </button>
        </form>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl mb-4">Add Entry</h2>
        <form onSubmit={handleAddEntry} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formState.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="location"
            value={formState.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            name="date"
            value={formState.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <textarea
            name="content"
            value={formState.content}
            onChange={handleChange}
            placeholder="Content"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Add Entry
          </button>
        </form>
      </div>

      <h2 className="text-2xl mb-4">Entries:</h2>
      {entriesLoading ? (
        <p>Loading entries...</p>
      ) : (
        <ul className="space-y-4">
          {entriesData?.entries?.map((entry) => (
            <li key={entry._id} className="p-4 border border-gray-300 rounded shadow-sm">
              <h3>{entry.title}</h3>
              <p><strong>Location:</strong> {entry.location}</p>
              <p><strong>Date:</strong> {entry.date}</p>
              <p><strong>Content:</strong> {entry.content}</p>
              <button
                onClick={() => handleDeleteEntry(entry._id)}
                className="mt-2 bg-red-500 text-white py-1 px-3 rounded"
              >
                Delete Entry
              </button>
            </li>
          ))}
        </ul>
      )}
      {entriesError && <p>Error loading entries: {entriesError.message}</p>}
    </div>
  );
};

export default TestComponent;
