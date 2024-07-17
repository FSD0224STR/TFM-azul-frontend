import { useState } from "react";
import { Form, Input, Button, message, Typography, Breadcrumb } from "antd";
import userApi from "../apiservice/userApi";
import { HomeOutlined } from "@ant-design/icons";

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
    <div>
      <div className="breadcrumbContainer">
        <Breadcrumb
          items={[
            {
              href: "../",
              title: <HomeOutlined />,
            },
            {
              title: `Has olvidado tu contraseña?`,
            },
          ]}
        />
      </div>
      <div className="cardInfoTrip cntr">
        {emailSent ? (
          <Typography.Title level={4} className="messagePassword ">
            Revisa tu bandeja de entrada.
          </Typography.Title>
        ) : (
          <>
            <Typography.Title level={4} className="titleCntr">
              Danos tu email y te enviaremos un correo con instrucciones <br />{" "}
              para restablecer tu contraseña.
            </Typography.Title>
            <Form
              name="forgot-password-form "
              className="messagePassword"
              onFinish={onFinish}
            >
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
                <Form.Item className="sendBtn">
                  <Input
                    className="sendMail"
                    placeholder="Correo electrónico"
                  />

                  <Button
                    className="sendMail "
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                  >
                    Enviar
                  </Button>
                </Form.Item>
              </Form.Item>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
