import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/AppRoutes'

import { store } from './app/store'
import { Toaster } from "react-hot-toast"
import { Provider } from 'react-redux'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <AppRoutes />
            <Toaster />
        </Provider>
    </QueryClientProvider>

)
