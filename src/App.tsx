import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './Layout'
import { Home } from './Home'
import { Statistics } from './modules/statistics and sustainability'
import { BookingConfirmed, MyTrips, SearchTrips, TripCompleted } from './modules/trips'
import { 
  PaymentConfirmation, SavedCardsPayment, AddNewCard, PaymentSuccessDetailed, BrebKeysPayment,
  PaymentHistory
} from './modules/payments'
import { TripDetails } from './modules/trips/pages/TripDetails'

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/home" replace />} />
                    <Route path="home" element={<Home />} />
                    <Route path="trips" element={<MyTrips />} />
                    <Route path="search-trips" element={<SearchTrips />} />
                    <Route path="statistics" element={<Statistics />} />
                    {/* Rutas del modulo Payments (Poseidon) */}
                    <Route path="payment/:bookingId" element={<PaymentConfirmation />} />
                    <Route path="payment/cards/:bookingId" element={<SavedCardsPayment />} />
                    <Route path="payment/cards/add" element={<AddNewCard/>} />
                    <Route path="payment/breb/:paymentId" element={<BrebKeysPayment/>} />
                    <Route path="payment/success-detailed/:paymentId" element={<PaymentSuccessDetailed/>} />
                    <Route path="payment/History" element={<PaymentHistory/>} />
                    {/*Rutas del modulo trips (Poseidon) */}
                    <Route path="booking/confirmed/:bookinId" element={<BookingConfirmed/>} />
                    <Route path="trips/:tripId" element={<TripDetails/>} />
                    <Route path="trips" element={<MyTrips />} />
                    <Route path="search-trips" element={<SearchTrips />} />
                    <Route path="trip/completed" element={<TripCompleted />} />
                    
                    
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;