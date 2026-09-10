import { createRoot } from 'react-dom/client'
import './index.css'

import MyRoutes from './routes/MyRoutes.jsx'
import { AuthProvider } from './context/AuthContext.jsx'


createRoot(document.getElementById('root')).render(

  <AuthProvider>
    <MyRoutes />
  </AuthProvider>
)

