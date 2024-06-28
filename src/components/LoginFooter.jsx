import { useLocation, Link } from "react-router-dom";

export const LoginFooter = () => {
  const location = useLocation();

  if (location.pathname === "/registration") {
    return (
      <div className="footer2">
        <p>
          ¿Ya tienes una cuenta? <Link to="/">Inicia aquí</Link>
        </p>
      </div>
    );
  }

  if (location.pathname === "/") {
    return (
      <div className="footer">
        <p>
          ¿No tienes cuenta? <Link to="/registration"> Regístrate aquí</Link>
        </p>
        <p>
          ¿Has olvidado la contraseña?{" "}
          <Link to=""> Recupera tu contraseña </Link>
        </p>
      </div>
    );
  }
};
