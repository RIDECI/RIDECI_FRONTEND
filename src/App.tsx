import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './Layout'
import { Home } from './Home'
import { Statistics } from './modules/statistics and sustainability'
import { MyTrips, SearchTrips, TripDetails, ReservationConfirmed } from './modules/trips'


function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/home" replace />} />
                    <Route path="home" element={<Home />} />
                    <Route path="trips" element={<MyTrips />} />
                    <Route path="search-trips" element={<SearchTrips />} />
                    <Route path="trip-details" element={<TripDetails />} />
                    <Route path="reservation-confirmed" element={<ReservationConfirmed />} />
                    <Route path="statistics" element={<Statistics />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;