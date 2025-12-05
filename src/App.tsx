import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './Layout'
import { Home } from './Home'
import { Statistics } from './modules/statistics and sustainability'
import { BookingConfirmed, MyTrips, SearchTrips, TripCompleted, MyAccompaniments, SearchAccompaniments, AccompanimentRouteDetails,AccompanimentConfirmed, AccompanimentCompleted } from './modules/bookings'
import { 
  PaymentConfirmation, SavedCardsPayment, AddNewCard, PaymentSuccessDetailed, BrebKeysPayment,
  PaymentHistory
} from './modules/payments'
import { TripDetails } from './modules/bookings/pages/TripDetails'

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/home" replace />} />
                    <Route path="home" element={<Home />} />
                    <Route path="statistics" element={<Statistics />} />
                    {/* Rutas del modulo Payments (Poseidon) */}
                    <Route path="payment/:bookingId/confirm" element={<PaymentConfirmation />} />
                    <Route path="payment/cards" element={<SavedCardsPayment />} />
                    <Route path="payment/cards/add" element={<AddNewCard/>} />
                    <Route path="payment/breb/:paymentId" element={<BrebKeysPayment/>} />
                    <Route path="payment/success/:paymentId" element={<PaymentSuccessDetailed/>} />
                    <Route path="payment/history" element={<PaymentHistory/>} />
                    {/*Rutas del modulo bookings (Poseidon) */}
                    <Route path="booking/confirmed/:bookinId" element={<BookingConfirmed/>} />
                    <Route path="bookings/:bookingId" element={<TripDetails/>} />
                    <Route path="bookings" element={<MyTrips />} />
                    <Route path="bookings/search" element={<SearchTrips />} />
                    <Route path="bookings/:bookingId/completed" element={<TripCompleted />} />
                    <Route path="accompaniments" element={<MyAccompaniments />} />
                    <Route path="accompaniments/search" element={<SearchAccompaniments />} />
                    <Route path="accompaniment/:routeId" element={<AccompanimentRouteDetails />} />
                    <Route path="accompaniments/:id/confirmed" element={<AccompanimentConfirmed />} />
                    <Route path="accompaniments/:id/completed" element={<AccompanimentCompleted />} />


                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;