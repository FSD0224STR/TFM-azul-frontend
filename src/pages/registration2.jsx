import { Typography, Form, Input, Button, Alert, Modal } from "antd";
import userApi from "/src/apiservice/userApi.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RegistrationForm2 = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState("");
  const [addedUser, setAddedUser] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { username, firstname, lastname, email, password } = values;
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
  };

  const handleModalOk = () => {
    setModalVisible(false); // Ocultar el modal
    navigate("/"); // Navegar a la página de inicio
  };

  const isFormValid = ({ length, uppercase, lowercase, number, specialChar }) =>
    length && uppercase && lowercase && number && specialChar && !error;

  return (
    <Form
      className="cardInfoTrip"
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
          { required: true, message: "Por favor ingresa tu Nombre de usuario" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Nombre"
        name="firstname"
        rules={[{ required: true, message: "Por favor ingresa tu nombre" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Apellidos"
        name="lastname"
        rules={[{ required: true, message: "Por favor ingresa tus apellidos" }]}
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
          { type: "email", message: "El correo electrónico no es válido" },
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
                specialChar: /[@$!%*?&]/.test(value),
              };
              return isFormValid(requirements)
                ? Promise.resolve()
                : Promise.reject(
                    new Error(
                      "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&)"
                    )
                  );
            },
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Registrarse
        </Button>
      </Form.Item>

      {error && (
        <Alert
          type="error"
          message={`Error al crear usuario: ${error}`}
          style={{ marginBottom: 24 }}
          showIcon
        />
      )}

      {addedUser && (
        <Modal
          title="Registro exitoso"
          open={modalVisible}
          onOk={handleModalOk}
          onCancel={() => setModalVisible(false)}
        >
          <p>
            Te has registrado correctamente. Inicia sesión para empezar a crear
            viajes.
          </p>
        </Modal>
      )}
    </Form>
  );
};

export default RegistrationForm2;
