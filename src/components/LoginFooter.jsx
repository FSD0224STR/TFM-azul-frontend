import { useLocation, Link } from "react-router-dom";
// Componente del pie de página
export const LoginFooter = () => {
  const location = useLocation();

  if (location.pathname === "/registration") {
    return (
      <div className="footer">
        <p>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia aquí</Link>
        </p>
      </div>
    );
  }

  if (location.pathname === "/login") {
    return (
      <div className="footer">
        <p>
          ¿No tienes una cuenta? <Link to="/registration">Regístrate aquí</Link>
        </p>
        <p>
          ¿Has olvidado la contraseña?{" "}
          <Link to=""> Recupera tu contraseña </Link>
        </p>
      </div>
    );
  }
};
