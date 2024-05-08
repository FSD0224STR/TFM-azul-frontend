import { Routes, Route, useNavigate} from 'react-router-dom';
import './App.css'; // Importa el archivo de estilos CSS

import LoginForm from './pages/login';
import RegistrationForm from './pages/registration';
import MainPage from './pages/mainpage';
import { useEffect } from 'react';


// Componente de la aplicación principal
export default function App() {

  const navigate = useNavigate ()

  useEffect (() => {
    const token = localStorage.getItem('access_token')
    if (!token) navigate ('/')
      else navigate ('/login')
  }, [])

  return (
    <>
      <div className="container">
        <div className="content">
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/registro" element={<RegistrationForm />} />
            <Route path="/home" element={<MainPage/>} />
            
          </Routes>
        </div>
      </div>
    </>
  );
}
