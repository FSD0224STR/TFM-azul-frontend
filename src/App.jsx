import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

import Home from "./pages/Home";
import Login from "./pages/login";
import UserDetails from "./pages/UserDetails";
import ViewCategory from "./pages/viewCategory";
import Trip from "./pages/Trip";
import JoinTripPage from "./pages/JoinTrip";
import FAQs from "./pages/Faqs";
import RegistrationForm2 from "./pages/registration2";

import { NavBar } from "./components/NavBar";

import { AuthContext } from "./contexts/authContext";

import "./styles/App.css";
import { Spin } from "antd";

export const App = () => {
  const { loading } = useContext(AuthContext);
  if (loading)
    return (
      <>
        <NavBar></NavBar>
        <div>
          <Spin size="large" />;
        </div>
      </>
    );
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/home" element={<Home props></Home>}></Route>

        <Route
          path="/perfil"
          element={<UserDetails props></UserDetails>}
        ></Route>

        <Route path="/" element={<Login props></Login>}></Route>

        <Route path="/home" element={<Home props></Home>}></Route>

        <Route path="/:id" element={<Trip props></Trip>}></Route>

        <Route
          path="categories/:id"
          element={<ViewCategory props></ViewCategory>}
        ></Route>

        <Route
          path="/registration"
          element={<RegistrationForm2 props></RegistrationForm2>}
        ></Route>

        <Route path="/join-trip/:id" element={<JoinTripPage />}></Route>

        <Route path="/faqs" element={<FAQs />}></Route>
      </Routes>
    </>
  );
};
