import { useNavigate } from "react-router-dom";
import { useState } from "react";
import userApi from "/src/apiservice/userApi.js";
import {
  Typography,
  Form,
  Input,
  Button,
  Alert,
  Modal,
  Spin,
  Breadcrumb,
} from "antd";
// import { HomeOutlined } from "@ant-design/icons";
import "../styles/Registration.css";

const RegistrationForm2 = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState("");
  const [addedUser, setAddedUser] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true); // Activar el estado de carga

    const { username, firstname, lastname, email, password } = values;
    try {
      const response = await userApi.addUser(
        firstname,
        lastname,
        username,
        password,
        email
      );
      if ("error" in response) {
        setError(response.error);
      } else {
        setAddedUser(response.data);
        setModalVisible(true); // Mostrar el modal informativo
      }
    } catch (error) {
      setError(
        "Ocurrió un error al procesar tu solicitud. Por favor, intenta de nuevo más tarde."
      );
    } finally {
      setLoading(false); // Desactivar el estado de carga, independientemente del resultado
    }
  };

  const handleModalOk = () => {
    setModalVisible(false); // Ocultar el modal
    navigate("/about"); // Navegar a la página de inicio
  };

  const isFormValid = ({ length, uppercase, lowercase, number, specialChar }) =>
    length && uppercase && lowercase && number && specialChar && !error;

  return (
    <div>
      <div className="breadcrumbContainer">
        <Breadcrumb
          items={[
            // {
            //   href: "../",
            //   title: <HomeOutlined />,
            // },
            {
              title: `Registro de un nuevo usuario`,
            },
          ]}
        />
      </div>
      <div className="cardInfoTrip">
        {loading ? (
          <Spin size="large" />
        ) : (
          <Form
            className="registration-form"
            form={form}
            name="register"
            onFinish={onFinish}
            layout="vertical"
            style={{
              maxWidth: 600,
              margin: "auto",
            }}
            scrollToFirstError
          >
            <Typography.Title
              level={2}
              style={{ textAlign: "center", marginBottom: 24 }}
            >
              Registro
            </Typography.Title>

            <Form.Item
              label="Nombre de usuario"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa tu Nombre de usuario",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Nombre"
              name="firstname"
              rules={[
                { required: true, message: "Por favor ingresa tu nombre" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Apellidos"
              name="lastname"
              rules={[
                { required: true, message: "Por favor ingresa tus apellidos" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Correo electrónico"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa tu correo electrónico",
                },
                {
                  type: "email",
                  message: "El correo electrónico no es válido",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="password"
              rules={[
                { required: true, message: "Por favor ingresa tu contraseña" },
                {
                  validator: (_, value) => {
                    const requirements = {
                      length: value.length >= 8,
                      uppercase: /[A-Z]/.test(value),
                      lowercase: /[a-z]/.test(value),
                      number: /\d/.test(value),
                      specialChar: /[@$!%*?&_-]/.test(value),
                    };
                    return isFormValid(requirements)
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error(
                            "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&_-)"
                          )
                        );
                  },
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            {error && (
              <Alert
                type="error"
                message={error.error}
                style={{ marginBottom: 24 }}
                showIcon
              />
            )}

            <Form.Item className="registration-btn">
              <Button type="primary" htmlType="submit" block>
                Registrarse
              </Button>
            </Form.Item>

            {addedUser && (
              <Modal
                title="Registro exitoso"
                open={modalVisible}
                onOk={handleModalOk}
                onCancel={() => setModalVisible(false)}
              >
                <p>
                  Te has registrado correctamente. Inicia sesión para empezar a
                  crear viajes.
                </p>
              </Modal>
            )}
          </Form>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm2;
