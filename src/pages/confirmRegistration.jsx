import { Typography, Button } from "antd";

const { Title, Text } = Typography;

const ConfirmRegistration = () => {
  return (
    <div className="cardInfoTrip">
      <Title>¿Ya te has registrado?</Title>
      <Text>
        Haz click al botón para confirmar tu registro y así poder iniciar
        sesión.
      </Text>
      <Button type="primary">Valida tu cuenta</Button>
    </div>
  );
};

export default ConfirmRegistration;
