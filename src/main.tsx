import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ToastProvider } from "./components/ToastContext";
import ToastContainer from "./components/ToastContainer";
import { GlobalNotificationProvider } from "./context/GlobalNotificationContext";
import { NotificationSimulator } from "./components/NotificationSimulator";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <GlobalNotificationProvider>
        <App />
        <ToastContainer />
        <NotificationSimulator />
      </GlobalNotificationProvider>
    </ToastProvider>
  </StrictMode>,
)
