import { Routes, Route } from "react-router-dom";
import "./App.css"; // Importa el archivo de estilos CSS

import LoginForm from "./pages/login";
import RegistrationForm from "./pages/registration";
import MainPage from "./pages/mainpage";

import { AuthContext } from "./contexts/authContext";
import { useContext } from "react";

export default function App() {
  const { loading } = useContext(AuthContext);
  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <div className="container">
        <div className="content">
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/registro" element={<RegistrationForm />} />
            <Route path="/home" element={<MainPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
