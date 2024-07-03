import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useParams } from "react-router-dom";
import userApi from "../apiservice/userApi";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useParams();

  const onFinish = async (values) => {
    setLoading(true);
    const { newPassword } = values;

    try {
      const response = await userApi.resetPassword(token, newPassword);
      if (response.error) {
        message.error(response.error);
      } else {
        message.success(response.data.message);
        // Redirigir al usuario a la página de inicio de sesión u otra página relevante
        // después de un restablecimiento exitoso
        // history.push('/login'); // Asegúrate de importar useHistory desde 'react-router-dom'
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      message.error("Error al restablecer la contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cardInfoTrip">
      <Form name="reset-password-form" onFinish={onFinish}>
        <Form.Item
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Por favor ingresa tu nueva contraseña",
            },
            {
              min: 8,
              message: "La contraseña debe tener al menos 8 caracteres",
            },
          ]}
        >
          <Input.Password placeholder="Nueva contraseña" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Restablecer contraseña
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
