import { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import userApi from "../apiservice/userApi";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await userApi.getUserByToken(token);
        if (response.data) {
          setUserInfo(response.data);
        } else {
          message.error("Error al obtener la información del usuario");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        message.error("Error al obtener la información del usuario");
      }
    };

    fetchUserInfo();
  }, [token]);

  const onFinish = async (values) => {
    setLoading(true);
    const { newPassword } = values;

    try {
      const response = await userApi.resetPassword(token, newPassword);
      if (response.error) {
        message.error(response.error);
      } else {
        message.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      message.error("Error al restablecer la contraseña");
    } finally {
      setLoading(false);
    }
  };

  if (!userInfo) {
    return <div>Cargando información del usuario...</div>;
  }

  return (
    <div className="">
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2>Hola {userInfo.firstname}, aquí puedes cambiar tu contraseña:</h2>
        <img
          src={userInfo.imageUrl}
          alt="Foto de perfil"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
      </div>
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
            {
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&)",
            },
          ]}
        >
          <Input.Password placeholder="Nueva contraseña" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Por favor confirma tu nueva contraseña",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Las contraseñas no coinciden")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirmar nueva contraseña" />
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
