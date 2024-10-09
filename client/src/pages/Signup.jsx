import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_PROFILE);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
    <div style={{ background: '#A5B68D' }} className="max-w-md w-full p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
      <h4 className="text-2xl font-bold mb-6 text-center">Sign Up</h4>

      {data ? (
        <p className="text-center">
          Success! You may now head{' '}
          <Link to="/" className="text-blue-500 underline">
            back to the homepage.
          </Link>
        </p>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <input
            placeholder="Your username"
            name="username"
            type="text"
            value={formState.username}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            style={{ background: '#FCFAEE' }}
          />
          <input
            placeholder="Your email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            style={{ background: '#FCFAEE' }}
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
            required
            className="w-full p-3 mb-6 border border-gray-300 rounded"
            style={{ background: '#FCFAEE' }}
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg transition duration-300 hover:scale-105"
            style={{ background: '#DA8359' }}
          >
            Submit
          </button>
        </form>
      )}

      {error && (
        <div className="mt-4 text-red-600 text-center">
          {error.message}
        </div>
      )}
    </div>
  </main>
  );
};

export default Signup;
