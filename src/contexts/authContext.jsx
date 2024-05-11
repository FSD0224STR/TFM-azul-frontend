import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../apiservice/userApi";

// Create the AuthContext
export const AuthContext = React.createContext();

// Create the AuthProvider component
export const AuthContextProvider = ({ children }) => {
  // State for tracking the logged in status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const getMyProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        if (token) {
          const response = await userApi.getMyProfile();
          if (response.data) {
            setProfile(response.data);
            setIsLoggedIn(true);
            navigate("/home");
          }
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getMyProfile();
  }, [navigate, isLoggedIn]);

  // Function for logging in
  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await userApi.login(username, password);
      if (response.error) {
        setError(response.error);
      } else {
        const token = response.data;
        localStorage.setItem("access_token", token);
        navigate("/home");
        setIsLoggedIn(true);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function for logging out
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  // Value object to be provided by the context
  const authContextValue = {
    isLoggedIn,
    error,
    loading,
    profile,
    login,
    logout,
    setError,
  };

  // Render the AuthProvider with the provided children
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
