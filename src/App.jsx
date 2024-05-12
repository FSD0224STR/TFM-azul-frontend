import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Registration from "./pages/registration";

import { AuthContext } from "./contexts/authContext";
import { useContext } from "react";
import { NavBar } from "./components/NavBar";

import './styles/App.css';

export const App = () => {
  const { loading } = useContext(AuthContext);
  if (loading) return <h1>Loading...</h1>;
  return (
    <>
      <NavBar></NavBar>
      <Routes >
          <Route path="/home" element={<Home props></Home>}></Route>
          <Route path="/login" element={<Login props ></Login>}></Route>
          <Route
            path="/registration"
            element={<Registration props></Registration>}
          ></Route>
      </Routes>
    </>
  );
};
