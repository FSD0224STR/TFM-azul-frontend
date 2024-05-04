import { Routes, Route} from 'react-router-dom';
import './App.css'; // Importa el archivo de estilos CSS

import LoginForm from './pages/login';
import RegistrationForm from './pages/registration';


// Componente de la aplicación principal
export default function App() {
  return (
    <>
      <div className="container">
        <div className="content">
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/registro" element={<RegistrationForm />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
