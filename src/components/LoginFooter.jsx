import { Link } from "react-router-dom";

export const LoginFooter = ({ onRegisterClick }) => {
  return (
    <div className="footer">
      <p>
        ¿No tienes cuenta?{" "}
        <Link to="/registration" onClick={onRegisterClick}>
          {" "}
          Regístrate aquí
        </Link>
      </p>
      <p>
        ¿Has olvidado la contraseña? <Link to=""> Recupera tu contraseña </Link>
      </p>
    </div>
  );
};
