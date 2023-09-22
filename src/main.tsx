import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import { ThemeProvider } from '@/components/theme-provider'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import CartProvider from './contexts/cart-provider.tsx'
import AuthProvider from './contexts/auth-provider.tsx'
import CompareProvider from './contexts/compare-provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
      <AuthProvider>
        <CartProvider>
          <CompareProvider>
            <App />
          </CompareProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </GoogleOAuthProvider>
)
