import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/AppRoutes'

import { store } from './app/store'
import {Toaster} from "react-hot-toast"
import { Provider } from 'react-redux'


createRoot(document.getElementById('root')).render(

    <Provider store={store}>
        <AppRoutes />
        <Toaster/>
    </Provider>
)
