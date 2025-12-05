import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Statistics } from './modules/statistics and sustainability'
import Login from './modules/authentication/pages/login'
import Register from './modules/authentication/pages/register'
import LandingPage from './modules/landingPage/pages/landingPage'
import { ProfileRegisterSelectionPage } from './modules/authentication/pages/rolePick'
import { Conversations } from './modules/security/pages/Conversations'
import { Travel } from './modules/trips'
import SectionTravel from './modules/trips/pages/SectionTravel'
import DetailsOfTravel from './modules/trips/pages/DetailsOfTravel'
import Geolocalization from './modules/geolocalization/pages/Geolocalization'
import { ProfileRegisterSelectionPage } from './modules/authentication/pages/ProfileRegisterSelection'
import { HomeDriver } from './modules/authentication/pages/HomeDriver.tsx'
import { HomePassenger } from './modules/authentication/pages/HomePassenger.tsx'
import { HomeCompanion } from './modules/authentication/pages/HomeCompanion.tsx'
import { Layout } from './Layout'
import { Home } from './Home'


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/authentication/profile-selection"
                    element={<ProfileRegisterSelectionPage />}
                />

                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/home" replace />} />
                    <Route path="home" element={<Home />} />
                    <Route path="home-driver" element={<HomeDriver />} />
                    <Route path="home-passenger" element={<HomePassenger />} />
                    <Route path="home-companion" element={<HomeCompanion />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/pickRole" element={<ProfileRegisterSelectionPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/app" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="statistics" element={<Statistics />} />
                    <Route path="conversations" element={<Conversations />} />
                    <Route path="travels" element={<Travel />} />
                    <Route path="sectionTravel" element={<SectionTravel />} />
                    <Route path="detailsOfTravel" element={<DetailsOfTravel />} />
                    <Route path="geolocalization" element={<Geolocalization />} />
                </Route>
            </Routes>
        </BrowserRouter>
        
    )
}

export default App;