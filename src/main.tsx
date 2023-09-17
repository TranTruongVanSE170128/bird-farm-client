import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import { ThemeProvider } from '@/components/theme-provider'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import CartProvider from './contexts/cart-provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <CartProvider>
          <App />
        </CartProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
)
