
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
import FloatingContact from "./components/FloatingContact/FloatingContact";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Events from "./pages/Events/Events";
import EventDetails from "./pages/Events/EventDetails";
import Contact from "./pages/Contact/Contact";
import Departments from "./pages/Department/Departments";
import Clinical from "./pages/Department/Clinical/Clinical";
import NonClinical from "./pages/Department/NonClinical/NonClinical";
import Appointment from "./pages/Appointment/Appointment";

import Dashboard from "./pages/community/Dashboard/Dashboard";
import Login from "./pages/community/Auth/Login";
import Signup from "./pages/community/Auth/Signup";
import Groups from "./pages/community/Groups/Groups";

import AdminDashboard from "./pages/admin/Dashboard/AdminDashboard";
import AdminAppointments from "./pages/admin/Dashboard/AdminAppointments";
import AdminContactMessages from "./pages/admin/Dashboard/AdminContactMessages";
import AdminEvents from "./pages/admin/Events/AdminEvents";

function AppContent() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  const isCommunityPage =
    location.pathname.startsWith("/community");

  const isAdminPage =
    location.pathname.startsWith("/admin");

  const showHospitalLayout =
    !isAuthPage && !isCommunityPage && !isAdminPage;

  return (
    <>
      <ScrollToTop />

      {showHospitalLayout && <Header />}

      <Routes>

        {/* PUBLIC HOSPITAL PAGES */}

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />

        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/clinical" element={<Clinical />} />
        <Route path="/departments/non-clinical" element={<NonClinical />} />

        <Route path="/appointment" element={<Appointment />} />


        {/* COMMUNITY AUTHENTICATION */}

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />


        {/* PROTECTED COMMUNITY PAGES */}

        <Route element={<ProtectedRoute />}>
          <Route
            path="/community/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/community/groups"
            element={<Groups />}
          />
        </Route>


        {/* PROTECTED HOSPITAL ADMIN PAGES */}

        <Route element={<AdminProtectedRoute />}>
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/appointments"
            element={<AdminAppointments />}
          />

          <Route
            path="/admin/contact-messages"
            element={<AdminContactMessages />}
          />

          <Route
            path="/admin/events"
            element={<AdminEvents />}
          />
        </Route>

      </Routes>

      {showHospitalLayout && (
        <>
          <Footer />
          <FloatingContact />
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
