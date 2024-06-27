import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Registration from "./pages/registration";

import { AuthContext } from "./contexts/authContext";
import { useContext } from "react";
import { NavBar2 } from "./components/NavBar2";

import "./styles/App.css";
import { TripInfo } from "./pages/tripInfo";
import { Trip } from "./pages/Trip";
import { ViewCategory } from "./pages/viewCategory";
import JoinTripPage from "./pages/JoinTrip";
import FAQs from "./pages/Faqs";

export const App = () => {
  const { loading } = useContext(AuthContext);
  if (loading) return <h1>Loading...</h1>;
  return (
    <>
      <NavBar2></NavBar2>
      <Routes>
        <Route path="/home" element={<Home props></Home>}></Route>

        <Route path="/" element={<Login props></Login>}></Route>

        {/* <Route
          path="/tripInfo/:id"
          element={<TripInfo props></TripInfo>}
        ></Route>

        <Route path="/tripInfo" element={<TripInfo props></TripInfo>}></Route> */}

        <Route path="/:id" element={<Trip props></Trip>}></Route>

        <Route
          path="categories/:id"
          element={<ViewCategory props></ViewCategory>}
        ></Route>

        <Route
          path="/registration"
          element={<Registration props></Registration>}
        ></Route>
        <Route path="/join-trip/:id" element={<JoinTripPage />}></Route>
        <Route path="/faqs" element={<FAQs />}></Route>
      </Routes>
    </>
  );
};
