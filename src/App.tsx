import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './Layout'
import { Home } from './Home'
import { Statistics } from './modules/statistics and sustainability'
import { MyTrips, SearchTrips, TripDetails } from './modules/trips'
import { 
  PaymentConfirmation, SavedCardsPayment, AddNewCard, PaymentSuccessDetailed, BrebKeysPayment,
  PaymentHistory
} from './modules/payments'

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
                    <Route path="statistics" element={<Statistics />} />
                    {/* Rutas del módulo Payments (Poseidon) */}
                    <Route path="payment/:bookingId" element={<PaymentConfirmation />} />
                    <Route path="payment/cards/:bookingId" element={<SavedCardsPayment />} />
                    <Route path="payment/cards/add" element={<AddNewCard/>} />
                    <Route path="payment/breb/:paymentId" element={<BrebKeysPayment/>} />
                    <Route path="payment/success-detailed/:paymentId" element={<PaymentSuccessDetailed/>} />
                    <Route path="payment/History" element={<PaymentHistory/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;