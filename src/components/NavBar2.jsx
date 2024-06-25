import { useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { Button, Spin, Alert } from "antd";
import LoginModal from "./LoginModal"; // Asegúrate de que la ruta sea correcta
import "../styles/NavBar2.css";

export const NavBar2 = () => {
  const { isLoggedIn, logout, loading, error, setError } =
    useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setError(""); // Clear any existing error message when closing the modal
  };

  return (
    <nav className="navbar">
      <div className="container1">
        <img
          className="logo"
          src="src/images/logo.png"
          alt="Logo de la Aplicación"
        />
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
                  <a href="/como-funciona">Cómo funciona</a>
                </li>
                <li>
                  <a href="/perfil">Perfil</a>
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
