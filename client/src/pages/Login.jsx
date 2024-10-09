import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

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
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
    <div style={{ background: '#A5B68D' }} className="max-w-md w-full p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
      <div>
      <h4 className="text-2xl font-bold mb-6 text-center">Login</h4>
          <div>
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form style={{ background: '#ECDFCC' }} onSubmit={handleFormSubmit} className="max-w-md mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg">

  <input
    placeholder="Email"
    name="email"
    type="email"
    value={formState.email}
    onChange={handleChange}
    required
    className="w-full p-3 mb-6 border border-gray-300 rounded"
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
              <div>
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
