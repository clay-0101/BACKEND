import Register from "../app/auth/Register"
import {createBrowserRouter}  from 'react-router'
import { RouterProvider } from "react-router"




const MyRoutes = () => {

    const router = createBrowserRouter([
        {
            path : '/',
            element : <Register/>
        }
    ])


  return <RouterProvider router={router}/>
}

export default MyRoutes