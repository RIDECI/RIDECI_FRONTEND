import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './Layout'
import { Home } from './Home'
import { Statistics } from './modules/statistics and sustainability'
import { Travel } from './modules/trips'
import SectionTravel from './modules/trips/pages/SectionTravel'
import DetailsOfTravel from './modules/trips/pages/DetailsOfTravel'
import Geolocalization from './modules/geolocalization/pages/Geolocalization'
import NotificationsPage from './modules/Notifications/pages/NotificationsPage'

import AlertsPage from './modules/security/pages/AlertsPage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/home" replace />} />
                    <Route path="home" element={<Home />} />
                    <Route path="statistics" element={<Statistics />} />
                    <Route path="travels" element={<Travel />} />
                    <Route path="sectionTravel" element={<SectionTravel />} />
                    <Route path="detailsOfTravel" element={<DetailsOfTravel />} />
                    <Route path="geolocalization" element={<Geolocalization />} />
                    <Route path="notifications" element={<NotificationsPage />} />
                    <Route path="alerts" element={<AlertsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
