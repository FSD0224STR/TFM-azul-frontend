import { useState } from "react";
import { Typography, Form, Input, Button, Alert } from "antd";
import {NavFooter} from "/src/components/NavFooter"
import userApi from "/src/apiservice/userApi.js";
import { useNavigate } from "react-router-dom/dist";

import '../styles/Registration.css';

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
      length: newPassword.length >= 8,
      uppercase: /[A-Z]/.test(newPassword),
      lowercase: /[a-z]/.test(newPassword),
      number: /\d/.test(newPassword),
      specialChar: /[@$!@#$%^&*()_+\-=\\[\]{};:\\|,.<>?/~]/.test(newPassword),
    });
  };

  
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Validación del email
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isValidEmail = emailRegex.test(newEmail);

    if (!isValidEmail) {
      setError("Por favor ingresa un correo electrónico válido");
    } else {
      setError("");
    }
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
      <div className="container">
        <div className="content">
          <Form name="register" onSubmit={handleRegister} layout="vertical">
            <h2></h2>
            <Typography.Title
              level={2}
              className="registrationTitle"
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
                onChange={handleEmailChange}
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
              <li>{requirements.length ? "✅" : "❌"} Al menos 8 caracteres</li>
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
              <div className="registerAlert">
                <Alert 
                  type="error"
                  message={`Error al crear usuario: ${error}`}
                  banner
                />
              </div>
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
      
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
