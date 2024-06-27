import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
//import Registration from "./pages/registration";

import { AuthContext } from "./contexts/authContext";
import { useContext } from "react";
import { NavBar2 } from "./components/NavBar2";

import "./styles/App.css";
import { Trip } from "./pages/Trip";
import { ViewCategory } from "./pages/viewCategory";
import JoinTripPage from "./pages/JoinTrip";
import FAQs from "./pages/Faqs";
import RegistrationForm2 from "./pages/registration2";

export const App = () => {
  const { loading } = useContext(AuthContext);
  if (loading) return <h1>Loading...</h1>;
  return (
    <>
      <NavBar2></NavBar2>
      <Routes>
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
