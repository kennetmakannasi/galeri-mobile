import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import { Icon } from '@iconify/react/dist/iconify.js';
import AuthLayout from './components/layout/authLayout.jsx';
import Login from './pages/auth/login.jsx';
import Register from './pages/auth/register.jsx';

import MainLayout from './components/layout/mainLayout.jsx';
import Home from './pages/home.jsx';
import Explore from './pages/explore.jsx';
import Bookmark from './pages/bookmark.jsx';
import Post, { handleComment } from './pages/post.jsx';
import ProfileEdit from './pages/profileEdit.jsx';
import User from './pages/user.jsx';
import SearchPage from './pages/search.jsx';
import Notification from './pages/notification.jsx';

function ErrorPage() {
  return (
    <div className='size-full flex items-center justify-center'>
      <div className='h-screen flex flex-col justify-center items-center text-center -mt-'>
        <Icon height={80} icon={'streamline-sharp:browser-error-404'}/>
        <div className="mt-2">
          <p className="text-xl font-bold">Page not found</p>
          <p className="text-text-gray">Make sure you type the right address</p>
        </div>
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout/>,
    children: [
      {
        path: "login",
        element: <Login/>,
      },
      {
        path: "register",
        element: <Register/>,
      },      
    ]
  },
  {
    path: "/",
    element: <MainLayout/>,
    errorElement: <ErrorPage/>,
    children:[
      {
        index: true,
        element: <Home/>
      },
      {
        path: "/explore",
        element: <Explore/>
      },
      {
        path: "/post/:id",
        element: <Post/>,
        action: handleComment
      },
      {
        path: "/search",
        element: <SearchPage/>
      },
      {
        path: "/notification",
        element: <Notification/>
      },
      {
        path: "/bookmark",
        element: <Bookmark/>
      },
      {
        path: "/profile",
        children: [
          {
            path: ":username",
            element: <User/>,
          },
          {
            path: "edit",
            element: <ProfileEdit/>
          }
        ]
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)