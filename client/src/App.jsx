import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Username from "./scenes/login/Username"
import PageNotFound from "./scenes/login/PageNotFound";
import Password from "./scenes/login/Password";
import EditProfile from "./scenes/Profile/EditProfile";
import Recovery from "./scenes/login/Recovery";
import Register from "./scenes/login/Register";
// import Reset from "./scenes/Reset";
import Reset from "./scenes/login/Reset";

// -----------------middlewares to protect routes------------
import { AuthoriseUser } from "./middleware/auth";
import { AuthoriseUsername } from "./middleware/auth";

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
]);

const App = () => {
  return (
    <main>
      <RouterProvider router={Routes}></RouterProvider>
    </main>
  );
};

export default App;
