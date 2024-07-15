import { useState, useEffect } from "react";
import { Typography, Spin, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import userApi from "../apiservice/userApi";

const { Title, Text } = Typography;

const ConfirmValidation = () => {
  const { token } = useParams(); 
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

 
  useEffect(() => {
    const verifyAccount = async () => {
      if (!token) {
        setError("No se proporcionó un token válido.");
        return;
      }

      setLoading(true); 
      try {
        await userApi.verifyUserAccount(token); 
        message.success("Cuenta verificada con éxito. Ahora puedes iniciar sesión."); 
        navigate("/login"); 
      } catch (error) {
        setError(error.response?.data?.message || error.message || "Error al verificar la cuenta. Por favor, inténtalo de nuevo."); // Capturar el error si ocurre algún problema
        message.error("Error al verificar la cuenta. Por favor, inténtalo de nuevo."); 
      } finally {
        setLoading(false); 
      }
    };

    verifyAccount(); 
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
          Tu cuenta está siendo verificada. Por favor, espera un momento...
        </Text> 
      )}
    </div>
  );
};

export default ConfirmValidation;
