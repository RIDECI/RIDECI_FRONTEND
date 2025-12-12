import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './Layout'
import { Home } from './Home'
import { Statistics } from './modules/statistics and sustainability'
import Login from './modules/authentication/pages/login'
import Register from './modules/authentication/pages/register'
import ForgotPasswordForm from './modules/authentication/pages/ForgotPasswordPage'
import EmailSentPage from './modules/authentication/pages/EmailSentPage'
import ResetPasswordPage from './modules/authentication/pages/ResetPasswordPage'
import VehicleDocumentsPage from './modules/authentication/pages/VehicleDocumentsPage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Redirigir raíz hacia login */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Rutas de autenticación */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPasswordForm />} /> 
                <Route path="/email-sent" element={<EmailSentPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                
                {/* Nueva ruta para documentos del vehículo */}
                <Route path="/vehicle-documents" element={<VehicleDocumentsPage />} />

                {/* Rutas protegidas bajo /app */}
                <Route path="/app" element={<Layout />}>
                    <Route path="home" element={<Home />} />
                    <Route path="statistics" element={<Statistics />} />
                </Route>

                {/* Página 404 */}
                <Route path="*" element={
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                            <p className="text-gray-600 mb-4">Página no encontrada</p>
                            <a href="/login" className="text-blue-600 hover:underline">
                                Volver al inicio
                            </a>
                        </div>
                    </div>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default App