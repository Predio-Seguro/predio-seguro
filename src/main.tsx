import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './routes/login-page.tsx'
import HomePage from './routes/home-page.tsx'
import SendEmailRecoveryPasswordPage from './routes/recovery-password-page.tsx'
import ValidateTokenPage from './routes/validate-token-page.tsx'
import NewPasswordPage from './routes/new-password-page.tsx'
import RegisterPage from './routes/register-page.tsx'
import ServiceOrderPage from './routes/service-order-page.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />
      },
      {
        path: "/email-recovery-password",
        element: <SendEmailRecoveryPasswordPage />
      },
      {
        path: "/validate-token",
        element: <ValidateTokenPage />

      },
      {
        path: "/new-password",
        element: <NewPasswordPage />
      },
      {
        path: "/home",
        element: <HomePage />
      },
      {
        path: "/orders",
        element: <ServiceOrderPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
