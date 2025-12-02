// src/App.tsx
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './Layout'
import { Home } from './Home'
import { Statistics } from './modules/statistics and sustainability'
import { Travel } from './modules/trips'
import SectionTravel from './modules/trips/pages/SectionTravel'
import DetailsOfTravel from './modules/trips/pages/DetailsOfTravel'
import Geolocalization from './modules/geolocalization/pages/Geolocalization'

// ---------- AdminHome ----------
import AdminLayout from "./modules/administration/AdminLayout";
import AdminHome from "./modules/administration/pages/AdminHome";
import AdminUsers from "./modules/administration/pages/AdminUsers";
import AdminStatistics from "./modules/administration/pages/AdminStatistics";
import AdminReports from "./modules/administration/pages/AdminReports";
import AdminMonitor from "./modules/administration/pages/AdminMonitor";
import AdminSettings from "./modules/administration/pages/AdminSettings";
// ------------------------------------------------

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Home usuarios normales */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="travels" element={<Travel />} />
          <Route path="sectionTravel" element={<SectionTravel />} />
          <Route path="detailsOfTravel" element={<DetailsOfTravel />} />
          <Route path="geolocalization" element={<Geolocalization />} />
        </Route>

        {/* Rutas AdminHome */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="statistics" element={<AdminStatistics />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="monitor" element={<AdminMonitor />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
