import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './Layout'
import { Home } from './Home'
import { Statistics } from './modules/statistics and sustainability'
import SelectProfile from './modules/reputation&profiles/pages/SelectProfile/SelectProfile'
import UpdateProfile from './modules/reputation&profiles/pages/UpdateProfile/UpdateProfile'
import Profile from './modules/reputation&profiles/pages/ConsultProfile/Profile'
import TripHistory from './modules/reputation&profiles/pages/TripHistory/TripHistory'
import CreateProfile from './modules/reputation&profiles/pages/CreateProfile/CreateProfile'
import ViewAllComments from './modules/reputation&profiles/pages/ViewAllComments/ViewAllComments'




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
                    <Route path="trip-history" element={<TripHistory />} />
                    <Route path="create-profile" element={<CreateProfile />} />
                    <Route path="comments" element={<ViewAllComments />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;