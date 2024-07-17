import { useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { Button, Spin, Alert, Typography } from "antd";
import LoginModal from "./LoginModal"; // Asegúrate de que la ruta sea correcta
import logo from "../images/logo.png";
import "../styles/NavBar2.css";
import { Link } from "react-router-dom";

export const NavBar2 = () => {
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
        <Link to="/about">
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
                <Typography.Text>
                  <a href="/home">Mis viajes</a>
                </Typography.Text>
                <Typography.Text>
                  <a href="/perfil">Perfil</a>
                </Typography.Text>
                <Typography.Text>
                  <a href="/FAQs">FAQs</a>
                </Typography.Text>
                <Typography.Text>
                  <a href="/about" onClick={logout}>
                    Cerrar sesión
                  </a>
                </Typography.Text>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
