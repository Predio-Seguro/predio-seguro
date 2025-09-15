import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './routes/login-page.tsx'
import HomePage from './routes/home-page.tsx'
import SendEmailRecoveryPasswordPage from './routes/recovery-password-page.tsx'

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
        path: "/email-recovery-password",
        element: <SendEmailRecoveryPasswordPage />
      },
      {
        path: "/home",
        element: <HomePage />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
