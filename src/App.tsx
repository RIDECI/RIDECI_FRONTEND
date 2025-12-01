import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Statistics } from './modules/statistics and sustainability'
import Login from './modules/authentication/pages/login'
import Register from './modules/authentication/pages/register'
import CarouselSelection from './modules/authentication/pages/rolePick'



function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/pickRole" element={<CarouselSelection />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/statistics" element={<Statistics />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;