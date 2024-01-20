import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as RouterMain} from 'react-router-dom'
import { AuthContextProvider } from './context/authContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterMain>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </RouterMain>
  </React.StrictMode>,
)
