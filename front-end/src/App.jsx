/* eslint-disable no-unreachable */
import {createBrowserRouter,RouterProvider} from "react-router-dom"

const routes=createBrowserRouter([
  {
    path:"/",
    element:<div>lukmaan</div>
  }
])

const App = () => {
  return (
    <main>
      <RouterProvider router={routes}></RouterProvider>
    </main>
  )

};

export default App;
