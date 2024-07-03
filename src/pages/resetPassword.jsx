import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import userApi from "../apiservice/userApi";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
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
            {},
            {
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&)",
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
