import { useState, useContext } from "react";

import { Form, Input, Button, Spin, Alert } from "antd";
import NavFooter from "../components/navFooter";
import Password from "antd/es/input/Password";
import { AuthContext } from "../contexts/authContext";

// Componente del formulario de inicio de sesión
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error, setError } = useContext(AuthContext);

  return (
    <>
      <Form name="login" layout="vertical">
        <h2>Iniciar sesión</h2>
        <Form.Item
          label="Correo electrónico"
          name="email"
          rules={[
            {
              required: true,
              message: "Por favor ingresa tu correo electrónico",
            },
          ]}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[
            { required: true, message: "Por favor ingresa tu contraseña" },
          ]}
        >
          <Input.Password
            value={Password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </Form.Item>

        <Form.Item>
          {loading ? (
            <Spin />
          ) : (
            <Button type="primary" onClick={() => login(username, password)}>
              Login
            </Button>
          )}
        </Form.Item>
      </Form>
      {error && (
        <Alert
          message={`Ha habido un error: ${error}`}
          type="error"
          closable
          onClose={() => setError("")}
        />
      )}
      <NavFooter />
    </>
  );
};
export default LoginForm;
