import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './Layout'
import { Home } from './Home'
import { Statistics } from './modules/statistics and sustainability'
import SelectProfile from './modules/reputation&profiles/pages/SelectProfile/SelectProfile'
import UpdateProfile from './modules/reputation&profiles/pages/UpdateProfile/UpdateProfile'
import Profile from './modules/reputation&profiles/pages/ConsultProfile/Profile'




function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/home" replace />} />
                    <Route path="home" element={<Home />} />
                    <Route path="statistics" element={<Statistics />} />
                    <Route path="select-profile" element={<SelectProfile />} />
                    <Route path="update-profile" element={<UpdateProfile />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;