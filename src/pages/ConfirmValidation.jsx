import { useState, useEffect } from "react";
import { Typography, Button, Spin, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import userApi from "./api/userApi"; // Asegúrate de tener esta API configurada

const { Title, Text } = Typography;

const ConfirmValidation = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyAccount = async () => {
      setLoading(true);
      try {
        await userApi.verifyUserAccount(token);
        message.success("Cuenta verificada con éxito. Ahora puedes iniciar sesión.");
        navigate("/login");
      } catch (error) {
        setError(error.message);
        message.error("Error al verificar la cuenta. Por favor, inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyAccount();
    }
  }, [token, navigate]);

  if (loading) {
    return (
      <div className="cardInfoTrip">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="cardInfoTrip">
      <Title>¿Ya te has registrado?</Title>
      {error ? (
        <Text type="danger">{error}</Text>
      ) : (
        <Text>
          Haz click al botón para confirmar tu registro y así poder iniciar
          sesión.
        </Text>
      )}
      <Button type="primary" onClick={() => navigate("/login")}>
        Iniciar sesión
      </Button>
    </div>
  );
};

export default ConfirmValidation;
