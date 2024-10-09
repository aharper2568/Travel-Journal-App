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
        variables: { username: formState.username, email: formState.email, password: formState.password },
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
      await deleteUser({ variables: {_id:  userId } });
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
    <div>
      <h1>Admin Only Component</h1>

      <h2>Users:</h2>
      {usersLoading ? <p>Loading users...</p> : (
        <ul className='border sm:container'>
          {usersData?.users?.map((user) => (
            <li className='border ' key={user._id}>
              {user.username} ({user.email}) - Admin: {user.isAdmin ? 'Yes' : 'No'}
              <button onClick={() => handleDeleteUser(user._id)}>Delete User</button>
            </li>
          ))}
        </ul>
      )}
      {usersError && <p>Error loading users: {usersError.message}</p>}

      <h2>My Info:</h2>
      {meLoading ? <p>Loading user info...</p> : (
        <div>
          <p>Username: {meData?.me?.username}</p>
          <p>Email: {meData?.me?.email}</p>
        </div>
      )}
      {meError && <p>Error loading user info: {meError.message}</p>}
      
      <div className='border'>
        <h2>Add User</h2>
        <form onSubmit={handleAddUser}>
          <input
            type="text"
            name="username"
            value={formState.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <button type="submit">Add User</button>
        </form>
      </div>
      
      <div className='border my-2'>
        <h2>Login</h2>
        <form onSubmit={handleLoginUser}>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
      
      <div className='border my-2'>
        <h2>Add Entry</h2>
        <form onSubmit={handleAddEntry}>
          <input
            type="text"
            name="title"
            value={formState.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <input
            type="text"
            name="location"
            value={formState.location}
            onChange={handleChange}
            placeholder="Location"
          />
          <input
            type="date"
            name="date"
            value={formState.date}
            onChange={handleChange}
            placeholder="Date"
          />
          <textarea
            name="content"
            value={formState.content}
            onChange={handleChange}
            placeholder="Content"
          />
          <button type="submit">Add Entry</button>
        </form>
      </div>

      <h2>Entries:</h2>
      {entriesLoading ? <p>Loading entries...</p> : (
        <ul className="border">
          {entriesData?.entries?.map((entry) => (
            <li key={entry._id} className="border my-2 p-2">
              <h3>{entry.title}</h3>
              <p><strong>Location:</strong> {entry.location}</p>
              <p><strong>Date:</strong> {entry.date}</p>
              <p><strong>Content:</strong> {entry.content}</p>
              <button onClick={() => handleDeleteEntry(entry._id)}>Delete Entry</button>
            </li>
          ))}
        </ul>
      )}
      {entriesError && <p>Error loading entries: {entriesError.message}</p>}
    </div>
  );
};

export default TestComponent;
