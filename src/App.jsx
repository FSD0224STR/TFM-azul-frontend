import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Registration from "./pages/registration";
import UserDetails from "./pages/UserDetails";

import { AuthContext } from "./contexts/authContext";
import { useContext } from "react";
import { NavBar } from "./components/NavBar";

import "./styles/App.css";
import { TripInfo } from "./pages/tripInfo";
import { Trip } from "./pages/Trip";
import { ViewCategory } from "./pages/viewCategory";

export const App = () => {
  const { loading } = useContext(AuthContext);
  if (loading) return <h1>Loading...</h1>;
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/home" element={<Home props></Home>}></Route>

        <Route path="/user" element={<UserDetails props></UserDetails>}></Route>

        <Route path="/login" element={<Login props></Login>}></Route>

        <Route
          path="/tripInfo/:id"
          element={<TripInfo props></TripInfo>}
        ></Route>

        <Route path="/tripInfo" element={<TripInfo props></TripInfo>}></Route>

        <Route path="/:id" element={<Trip props></Trip>}></Route>

        <Route
          path="categories/:id"
          element={<ViewCategory props></ViewCategory>}
        ></Route>

        <Route
          path="/registration"
          element={<Registration props></Registration>}
        ></Route>
      </Routes>
    </>
  );
};
