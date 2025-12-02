import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Statistics } from './modules/statistics and sustainability'
import Login from './modules/authentication/pages/login'
import Register from './modules/authentication/pages/register'
import CarouselSelection from './modules/authentication/pages/rolePick'
import LandingPage from './modules/landingPage/pages/landingPage'


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />

                <Route path="/pickRole" element={<CarouselSelection />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/statistics" element={<Statistics />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;