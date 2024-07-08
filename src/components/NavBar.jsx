import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../contexts/authContext";

import { Button, Spin, Alert } from "antd";
import "../styles/NavBar.css";

import LoginModal from "./LoginModal";

import logo from "../images/logo.png";

export const NavBar = () => {
  const { isLoggedIn, logout, loading, error, setError } =
    useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setError("");
  };
  const handleLoginSuccess = (returnUrl) => {
    console.log(returnUrl);
  };

  return (
    <nav className="navbar">
      <div className="container1">
        <Link to="/">
          <img className="logo" src={logo} alt="Logo de la Aplicación" />
        </Link>
      </div>

      <div className="container2">
        {!isLoggedIn && (
          <>
            <div className="container21"></div>
            <div className="container22">
              <Button className="login-btn" type="primary" onClick={showModal}>
                {loading ? <Spin /> : "Iniciar sesión"}
              </Button>
            </div>
            <LoginModal
              isModalVisible={isModalVisible}
              handleCancel={handleCancel}
              handleLoginSuccess={handleLoginSuccess}
            />
            {error && (
              <div className="error-container">
                <Alert
                  type="error"
                  message={error}
                  closable
                  onClose={() => setError("")}
                />
              </div>
            )}
          </>
        )}
        {isLoggedIn && (
          <div className="container2">
            <div className="container21"></div>
            <div className="container22">
              <ul className="navbar-links">
                <li>
                  <a href="/home">Mis viajes</a>
                </li>
                <li>
                  <a href="/perfil">Perfil</a>
                </li>
                <li>
                  <a href="/FAQs">FAQs</a>
                </li>
                <li>
                  <a href="/" onClick={logout}>
                    Cerrar sesión
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
