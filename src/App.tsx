// src/App.tsx
import "./index.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ------------------ App  ------------------ */
import { Statistics } from "./modules/statistics and sustainability";
import { Travel } from "./modules/trips";
import SectionTravel from "./modules/trips/pages/SectionTravel";
import DetailsOfTravel from "./modules/trips/pages/DetailsOfTravel";
import Geolocalization from "./modules/geolocalization/pages/Geolocalization";
import { Layout } from "./Layout";
import { Home } from "./Home";

/* ------------------ Auth ------------------ */
import Login from "./modules/authentication/pages/login";
import Register from "./modules/authentication/pages/register";
import LandingPage from "./modules/landingPage/pages/landingPage";
import SelectProfile from "./modules/reputation&profiles/pages/SelectProfile/SelectProfile";
import UpdateProfile from "./modules/reputation&profiles/pages/UpdateProfile/UpdateProfile";
import Profile from "./modules/reputation&profiles/pages/ConsultProfile/Profile";
import TripHistory from "./modules/reputation&profiles/pages/TripHistory/TripHistory";
import CreateProfile from "./modules/reputation&profiles/pages/CreateProfile/CreateProfile";
import ViewAllComments from "./modules/reputation&profiles/pages/ViewAllComments/ViewAllComments";
import { ProfileSelectionPage } from "./modules/authentication/pages/ProfileLoginSelection";
import { ProfileRegisterSelectionPage } from "./modules/authentication/pages/rolePick";
import { HomeDriver } from "./modules/authentication/pages/HomeDriver";
import { HomePassenger } from "./modules/authentication/pages/HomePassenger";
import { HomeCompanion } from "./modules/authentication/pages/HomeCompanion";
import ForgotPasswordPage from "./modules/authentication/pages/ForgotPasswordPage";
import NotificationsPage from './modules/Notifications/pages/NotificationsPage'

/* ------------------ Bookings ------------------ */
import { SearchTrips } from "./modules/bookings/pages/SearchTrips";
import { TripDetails } from "./modules/bookings/pages/TripDetails";
import { MyTrips } from "./modules/bookings/pages/MyTrips";
import { BookingConfirmed } from "./modules/bookings/pages/BookingConfirmed";
import { TripCompleted } from "./modules/bookings/pages/TripCompleted";

/* ------------------ Payments ------------------ */
import { PaymentConfirmation } from "./modules/payments/pages/PaymentConfirmation";
import { SavedCardsPayment } from "./modules/payments/pages/SavedCardsPayment";
import { AddNewCard } from "./modules/payments/pages/AddNewCard";
import { BrebKeysPayment } from "./modules/payments/pages/BrebKeysPayment";
import { PaymentSuccessDetailed } from "./modules/payments/pages/PaymentSuccessDetailed";
import { PaymentHistory } from "./modules/payments/pages/PaymentHistory";

/* ------------------ Admin ------------------ */
import AdminLayout from "./modules/administration/AdminLayout";
import AdminHome from "./modules/administration/pages/AdminHome";
import AdminUsers from "./modules/administration/pages/AdminUsers";
import AdminStatistics from "./modules/administration/pages/AdminStatistics";
import AdminReports from "./modules/administration/pages/AdminReports";
import AdminMonitor from "./modules/administration/pages/AdminMonitor";
import AdminSettings from "./modules/administration/pages/AdminSettings";
import EndTripRating from "./modules/reputation&profiles/pages/EndCalificateTravel/EndTripRating";

/* ------------------ Security and Comunication ------------------ */
import Reports from "./modules/security/pages/Reports";
import ReportForm from "./modules/security/pages/ReportForm";
import { Conversations } from "./modules/security/pages/Conversations";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing + Auth */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/pickRole" element={<ProfileSelectionPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="selectProfile" element={<SelectProfile />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />}/>
        <Route path="/roleRegisterPick" element={<ProfileRegisterSelectionPage />} />

        {/* ADMIN — ruta específica para admin dentro de /app/admin (NO anidada dentro de Layout) */}
        <Route path="/app/admin/*" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="statistics" element={<AdminStatistics />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="monitor" element={<AdminMonitor />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* main app (user) layout vive en /app */}
        <Route path="/app/*" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="statistics/report-download" element={<ReportDownload />} />
          <Route path="statistics/general" element={<GeneralStatistics />} />
          <Route path="updateProfile" element={<UpdateProfile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="tripHistory" element={<TripHistory />} />
          <Route path="createProfile" element={<CreateProfile />} />
          <Route path="comments" element={<ViewAllComments />} />
          <Route path="conversations" element={<Conversations />} />
          <Route path="travels" element={<Travel />} />
          <Route path="sectionTravel" element={<SectionTravel />} />
          <Route path="detailsOfTravel" element={<DetailsOfTravel />} />
          <Route path="geolocalization" element={<Geolocalization />} />
          <Route path="homeDriver" element={<HomeDriver />} />
          <Route path="homePassenger" element={<HomePassenger />} />
          <Route path="homeCompanion" element={<HomeCompanion />} />
          <Route path="calificationEndTrip" element={<EndTripRating />} />

          {/* Rutas de Bookings */}
          <Route path="searchTrips" element={<SearchTrips />} />
          <Route path="tripDetails/:bookingId" element={<TripDetails />} />
          <Route path="myTrips" element={<MyTrips />} />
          <Route path="bookingConfirmed" element={<BookingConfirmed />} />
          <Route path="tripCompleted" element={<TripCompleted />} />

          {/* Rutas de Payments */}
          <Route path="payment/confirm/:bookingId" element={<PaymentConfirmation />} />
          <Route path="payment/cards" element={<SavedCardsPayment />} />
          <Route path="payment/cards/new" element={<AddNewCard />} />
          <Route path="payment/breb/:bookingId" element={<BrebKeysPayment />} />
          <Route path="payment/success/:paymentId" element={<PaymentSuccessDetailed />} />
          <Route path="payment/history" element={<PaymentHistory />} />

          {/* Rutas de Alerts */}
          <Route path="security/reports" element={<Reports />} />
          <Route path="security/reports/new" element={<ReportForm />} />
        </Route>
        {/* fallback 404 */}
        <Route
          path="*"
          element={
            <div className="p-8">
              Página no encontrada — <a href="/">Ir al inicio</a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
