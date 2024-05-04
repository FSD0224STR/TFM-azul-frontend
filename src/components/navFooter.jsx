import { useLocation, Link } from 'react-router-dom';
// Componente del pie de página
const NavFooter = () => {
    const location = useLocation();
  
    if (location.pathname === '/registro') {
      return (
        <div className="footer">
          <p>¿Ya tienes una cuenta? <Link to="/">Inicia aquí</Link></p>
        </div>
      );
    }
  
    return (
      <div className="footer">
        <p>¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link></p>
      </div>
    );
  };
  
export default NavFooter;