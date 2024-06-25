import { useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { Spin, Alert } from "antd";
import "../styles/NavBar2.css";

export const NavBar2 = () => {
  const { isLoggedIn, login, logout, loading, error, setError } =
    useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
            <div className="container21">
              <input
                className="input"
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
              />
            </div>
            <div className="container22">
              <form>
                <input
                  className="input"
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
                <button type="submit" onClick={() => login(username, password)}>
                  {loading ? <Spin /> : "Iniciar sesión"}
                </button>
              </form>
            </div>
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
              {isLoggedIn && (
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
                    <a href="/login" onClick={logout}>
                      Cerrar sesión
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
