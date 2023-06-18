import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Username from "./scenes/login/Username"
import PageNotFound from "./scenes/login/PageNotFound";
import Password from "./scenes/login/Password";
import EditProfile from "./scenes/Profile/EditProfile";
import Recovery from "./scenes/login/Recovery";
import Register from "./scenes/login/Register";
// import Reset from "./scenes/Reset";
import Reset from "./scenes/login/Reset";
import HomePage from "./scenes/Profile/HomePage";
import ExplorePage from "./scenes/explore/explore";
// -----------------middlewares to protect routes------------
import { AuthoriseUser } from "./middleware/auth";
import { AuthoriseUsername } from "./middleware/auth";
import UserProfile from "./components/userPage";


const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Username />,
  },
  {
    path: "/password",
    element: <AuthoriseUsername><Password/></AuthoriseUsername>
  },

  {
    path: "/reset",
    element: <Reset />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/recovery",
    element: <Recovery />,
  },
  {
    path: "/pagenotfound",
    element: <PageNotFound />,
  },
  {
    path: "/editprofile",
    element: <AuthoriseUser><EditProfile/></AuthoriseUser>
  },
  {
    path:"/homepage",
    element:<AuthoriseUser><HomePage/></AuthoriseUser>
  },{
    path:"/explore",
    element:<AuthoriseUser><ExplorePage/></AuthoriseUser>
  },{
    path:"/user",
    element:<AuthoriseUser><UserProfile/></AuthoriseUser>
  }
]);

const App = () => {
  return (
    <main>
      <RouterProvider router={Routes}></RouterProvider>
    </main>
  );
};

export default App;
