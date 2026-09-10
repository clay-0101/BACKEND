import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MyRoutes from './routes/MyRoutes.jsx'
import { AuthProvider } from './context/AuthContext.jsx'


createRoot(document.getElementById('root')).render(

  <AuthProvider>
    <MyRoutes />
  </AuthProvider>
)

