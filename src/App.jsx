import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import UserDetails from "./pages/UserDetails";
import { AuthContext } from "./contexts/authContext";
import { useContext, useEffect, useState } from "react";
import { NavBar2 } from "./components/NavBar2";
import "./styles/App.css";
import { Trip } from "./pages/Trip";
import { ViewCategory } from "./pages/viewCategory";
import JoinTripPage from "./pages/JoinTrip";
import FAQs from "./pages/Faqs";
import RegistrationForm2 from "./pages/registration2";
import ConfirmValidation from "./pages/ConfirmValidation"; 
import { Spin } from "antd";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";
//websockets
import { socket } from './socket';




export const App = () => {
  const { loading } = useContext(AuthContext);
  //websockets
  
  const [userToDisconnect, setUserToDisconnect] = useState(localStorage.getItem('userId') || "");

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    function onConnect() {
      if (userId !== null) {
        setUserToDisconnect(userId);
        console.log ("este el es id del usuario", userId)
        socket.emit('connection', userId); // Enviar userId al servidor al conectar
      }
    }

    function onDisconnect() {
      
      console.log("desconectando usuario", userToDisconnect);
      socket.emit('disconnect', userToDisconnect); // Enviar userId al servidor al desconectar
    }

  

    function onUpdate (data) {
      console.log("actualizando un viaje", data);
      messageApi.open({
        type: 'success',
        content: `${data}`,
        duration: 10,
      });
      
    }

    

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onUpdate); // Escuchar el evento 'tripUpdated'
    

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off ('message', onUpdate)
      
    };
  }, []);



  if (loading) {
    return (
      <>
        <NavBar2 />
        <div className="cardInfoTrip">
          <Spin size="large" />
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar2 />
      {contextHolder}
      
      <Routes>
        <Route exact path="/about" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<UserDetails />} />

        <Route path="/trip/:id" element={<Trip />} />
        <Route path="categories/:id" element={<ViewCategory />} />
        <Route path="/registration" element={<RegistrationForm2 />} />
        <Route path="/confirm-validation/:token" element={<ConfirmValidation />} />
        <Route path="/join-trip/:id" element={<JoinTripPage />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/forgot-password/" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* Redirigir a la página por defecto si la ruta no coincide */}
        <Route path="*" element={<Navigate to="/about" />} />
      </Routes>
    </>
  );
};
