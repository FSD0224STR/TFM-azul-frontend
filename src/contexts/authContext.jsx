import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../apiservice/userApi";

// Creamos el AuthContext
export const AuthContext = React.createContext();

// Creamos el componente AuthProvider
export const AuthContextProvider = ({ children }) => {
  // Estado para el seguimiento de la sesión
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const getMyProfile = async () => {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      if (token) {
        const response = await userApi.getMyProfile();
        if (response.data) {
          setProfile(response.data);
          setIsLoggedIn(true);
          navigate("/home");
        }
      }
      setLoading(false);
    };
    getMyProfile();
  }, [navigate]);

  //Función para iniciar sesión
  const login = async (name, password) => {
    setLoading(true);
    const response = await userApi.login(name, password);

    if (response.error) setError(response.error);
    else {
      const token = response.data;
      localStorage.setItem("access_token", token);
      navigate("/home");
    }
    setLoading(false);
    setIsLoggedIn(true);
  };

  //Función para cerrar sesión
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("access_token");
  };

  const authContextValue = {
    isLoggedIn,
    error,
    loading,
    profile,
    login,
    logout,
    setError,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
