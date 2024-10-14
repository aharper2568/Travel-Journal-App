import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'

import Layout from './Layout.jsx'
import Home from './pages/Home';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Error from './pages/Error';
import CreatePost from './pages/CreatePost'
import TestComponent from './pages/Debug.jsx';
import SearchResults from './pages/SearchResults.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/me',
        element: <Profile />
      }, {
        path: '/profiles/:id',
        element: <Profile />
      }, {
        path: '/create',
        element: <CreatePost />
      }, {
        path: '/debug',
        element: <TestComponent/>
      }, {
        path: '/search/:location',
        element: <SearchResults/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
