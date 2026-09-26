import React, { useEffect } from 'react'
import { createBrowserRouter } from "react-router"
import { RouterProvider } from 'react-router'
import HomePage from '../pages/HomePage'
import AuthPage from '../pages/AuthPage'
import Login from '../features/auth/ui/Login'
import Register from '../features/auth/ui/Register'
import publicApi from '../config/publicApi'
import { useDispatch } from 'react-redux'
import { setAuth } from '../features/auth/state/authSlice'
import App from '../app/App'




const AppRoutes = () => {
    let dispatch = useDispatch()

    useEffect(() => {

        const restoreSession = async () => {
            try {

                let response = await publicApi.post("/auth/refresh-token")

                dispatch(setAuth({
                    user: response.data.data.user,
                    accessToken: response.data.accessToken
                }))
            } catch (error) {
                 // if user is logout then it shows error when you refresh ,so i choose nothing will be return 
            }
        }

        restoreSession()
    }, [])


    let router = createBrowserRouter([
        {
            path: "",
            element: <App/>,
            children : [
                {
                    path : "/",
                    element : <HomePage/>
                }
            ]
        },
        {
            path: "",
            element: <AuthPage />,
            children: [
                {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/register",
                    element: <Register />
                }
            ]
        }
    ])



    return <RouterProvider router={router} />
}

export default AppRoutes