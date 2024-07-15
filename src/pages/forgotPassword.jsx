import { useState } from "react";
import { Form, Input, Button, message, Typography } from "antd";
import userApi from "../apiservice/userApi";
import delfines from "../images/delfines.png";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const { email } = values;

    try {
      const response = await userApi.forgotPassword(email);
      if (response.error) {
        message.error(response.error);
      } else {
        message.success(response.data.message);
        setEmailSent(true);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      message.error(
        "Error al enviar la solicitud de recuperación de contraseña"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="messagePassword ">
      {emailSent ? (
        <Typography.Text className="messagePassword">
          Revisa tu bandeja de entrada.
        </Typography.Text>
      ) : (
        <Form name="forgot-password-form" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Por favor ingresa tu correo electrónico",
              },
              {
                type: "email",
                message: "Por favor ingresa un correo electrónico válido",
              },
            ]}
          >
            <Input placeholder="Correo electrónico" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Enviar correo de recuperación
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default ForgotPassword;
