import { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import {NavFooter} from "/src/components/navFooter"
import userApi from "/src/apiservice/userApi.js";
import { useNavigate } from "react-router-dom/dist";

const RegistrationForm = () => {
  const [password, setPassword] = useState("");
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
  });
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [addedUser, setAddedUser] = useState("");

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Validación de la contraseña
    //const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!@#$%^&*()_+\-=\[\]{};:\\|,.<>?/~])[A-Za-z\d@$!@#$%^&*()_+\-=\[\]{};:\\|,.<>?/~]{10,}$/;
    setRequirements({
      length: newPassword.length >= 10,
      uppercase: /[A-Z]/.test(newPassword),
      lowercase: /[a-z]/.test(newPassword),
      number: /\d/.test(newPassword),
      specialChar: /[@$!@#$%^&*()_+\-=\\[\]{};:\\|,.<>?/~]/.test(newPassword),
    });
  };

  const handleRegister = async () => {
    const response = await userApi.addUser(
      firstname,
      lastname,
      username,
      password,
      email
    );
    console.log(response);
    if (response.newUser) return navigate("/");
    else setError(response.message);

    if (response.newUser) setAddedUser(response.newUser);
  };

  return (
    <>
      <Form name="register" onSubmit={handleRegister} layout="vertical">
        <h2>Registrarse</h2>
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
          <Input
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
        </Form.Item>

        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: "Por favor ingresa tu nombre" }]}
        >
          <Input
            value={firstname}
            onChange={(e) => setFirstname(e.currentTarget.value)}
          />
        </Form.Item>

        <Form.Item
          label="Apellidos"
          name="surname"
          rules={[
            { required: true, message: "Por favor ingresa tus apellidos" },
          ]}
        >
          <Input
            value={lastname}
            onChange={(e) => setLastname(e.currentTarget.value)}
          />
        </Form.Item>

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
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[
            { required: true, message: "Por favor ingresa tu contraseña" },
          ]}
        >
          <Input.Password onChange={handlePasswordChange} />
        </Form.Item>
        <ul>
          <li>{requirements.length ? "✅" : "❌"} Al menos 10 caracteres</li>
          <li>{requirements.uppercase ? "✅" : "❌"} Al menos 1 mayúscula</li>
          <li>{requirements.lowercase ? "✅" : "❌"} Al menos 1 minúscula</li>
          <li>{requirements.number ? "✅" : "❌"} Al menos 1 número</li>
          <li>
            {requirements.specialChar ? "✅" : "❌"} Al menos un caracter
            especial
          </li>
        </ul>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleRegister}
            block
          >
            Registrarse
          </Button>
        </Form.Item>
        {error && (
          <Alert
            type="error"
            message={`Error al crear usuario: ${error}`}
            banner
          />
        )}
        {addedUser && (
          <Alert
            type="success"
            message={`Usuario creado con éxito: ${addedUser.username}`}
            banner
          />
        )}
      </Form>
      < NavFooter/>
    </>
  );
};

export default RegistrationForm;
