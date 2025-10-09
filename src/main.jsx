import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, redirect, RouterProvider } from "react-router";

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

function ErrorPage() {
  return (
    <h1>404</h1>
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