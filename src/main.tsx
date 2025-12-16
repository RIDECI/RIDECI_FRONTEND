import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ToastProvider } from "./components/ToastContext";
import ToastContainer from "./components/ToastContainer";
import { GlobalNotificationProvider } from "./context/GlobalNotificationContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <GlobalNotificationProvider>
        <App />
        <ToastContainer />
      </GlobalNotificationProvider>
    </ToastProvider>
  </StrictMode>,
)
