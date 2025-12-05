import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './Layout'
import { Home } from './Home'
import { Statistics } from './modules/statistics and sustainability'
import { Conversations } from './modules/security/pages/Conversations'
import { Travel } from './modules/trips'
import SectionTravel from './modules/trips/pages/SectionTravel'
import DetailsOfTravel from './modules/trips/pages/DetailsOfTravel'
import Geolocalization from './modules/geolocalization/pages/Geolocalization'


function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/home" replace />} />
                    <Route path="home" element={<Home />} />
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