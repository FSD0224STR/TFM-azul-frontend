import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import UserDetails from "./pages/UserDetails";
import { AuthContext } from "./contexts/authContext";
import { useContext } from "react";
import { NavBar2 } from "./components/NavBar2";
import "./styles/App.css";
import { Trip } from "./pages/Trip";
import { ViewCategory } from "./pages/viewCategory";
import JoinTripPage from "./pages/JoinTrip";
import FAQs from "./pages/Faqs";
import RegistrationForm2 from "./pages/registration2";
import ConfirmRegistration from "./pages/confirmRegistration"; // Importa la nueva página
import { Spin } from "antd";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";

export const App = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <>
        <NavBar2 />
        <div className="cardInfoTrip">
          <Spin size="large" />
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar2 />
      <Routes>
        <Route exact path="/about" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<UserDetails />} />

        <Route path="/trip/:id" element={<Trip />} />
        <Route path="categories/:id" element={<ViewCategory />} />
        <Route path="/registration" element={<RegistrationForm2 />} />
        <Route path="/confirm-registration" element={<ConfirmRegistration />} />
        <Route path="/join-trip/:id" element={<JoinTripPage />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/forgot-password/" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* Redirigir a la página por defecto si la ruta no coincide */}
        <Route path="*" element={<Navigate to="/about" />} />
      </Routes>
    </>
  );
};
