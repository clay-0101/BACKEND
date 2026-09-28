import React, { useEffect, useRef } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router"
import HomePage from '../pages/HomePage'
import AuthPage from '../pages/AuthPage'
import Login from '../features/auth/ui/Login'
import Register from '../features/auth/ui/Register'
import publicApi from '../config/publicApi'
import { useDispatch } from 'react-redux'
import { setAuth } from '../features/auth/state/authSlice'
import App from '../app/App'
import ProductsPage from '../pages/ProductsPage'
import ProductDetailPage from '../pages/ProductDetailPage'



const router = createBrowserRouter([
    {
        path: "",
        element: <App />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/products", element: <ProductsPage /> },
            { path: "/products/:id", element: <ProductDetailPage /> }
        ]
    },
    {
        path: "",
        element: <AuthPage />,
        children: [
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> }
        ]
    }
])


const AppRoutes = () => {
    let dispatch = useDispatch()
    const hasRestoredSession = useRef(false)

    useEffect(() => {
        
        if (hasRestoredSession.current) return
        hasRestoredSession.current = true

        const restoreSession = async () => {
            try {
                let response = await publicApi.post("/auth/refresh-token")
                dispatch(setAuth({
                    user: response.data.data.user,
                    accessToken: response.data.accessToken
                }))
            } catch (error) {
                // no issue
            }
        }

        restoreSession()
    }, [])

    return <RouterProvider router={router} />
}

export default AppRoutes