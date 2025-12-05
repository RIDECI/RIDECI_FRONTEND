import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './Layout'
import { Home } from './Home'
import { Statistics } from './modules/statistics and sustainability'
import { Travel } from './modules/trips'
import SectionTravel from './modules/trips/pages/SectionTravel'
import DetailsOfTravel from './modules/trips/pages/DetailsOfTravel'
import Geolocalization from './modules/geolocalization/pages/Geolocalization'
import { ProfileRegisterSelectionPage } from './modules/authentication/pages/ProfileRegisterSelection'
import { HomeDriver } from './modules/authentication/pages/HomeDriver.tsx'
import { HomePassenger } from './modules/authentication/pages/HomePassenger.tsx'
import { HomeCompanion } from './modules/authentication/pages/HomeCompanion.tsx'


function App(){
    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas de autenticación SIN Layout  */}
                <Route
                    path="/authentication/profile-selection"
                    element={<ProfileRegisterSelectionPage />}
                />

                {/* Rutas CON Layout (sidebar) */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/home" replace />} />
                    <Route path="home" element={<Home />} />
                    <Route path="home-driver" element={<HomeDriver />} />
                    <Route path="home-passenger" element={<HomePassenger />} />
                    <Route path="home-companion" element={<HomeCompanion />} />
                    <Route path="statistics" element={<Statistics />} />
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