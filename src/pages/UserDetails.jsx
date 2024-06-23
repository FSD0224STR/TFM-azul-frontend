import { useState } from "react";
import {
  Typography,
  Form,
  Input,
  Button,
  Alert,
  Upload,
  Skeleton,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { LoginFooter } from "/src/components/LoginFooter";
import { useNavigate } from "react-router-dom/dist";
import userApi from "/src/apiservice/userApi.js";

import "../styles/UserDetails.css";

const UserDetails = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  const [error, setError] = useState("");
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  const isFormValid = !error && username && firstname && lastname && email;

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
    const response = await userApi.updateUser(
      firstname,
      lastname,
      username,
      email,
      image
    );
    if ("error" in response) {
      setError(response.error);
    } else {
      setUser(response.data);
    }
  };

  const uploadProps = {
    beforeUpload: async (file) => {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await userApi.addNewImage(formData);

        message.success("Imagen cargada con éxito!");
        console.log("Imagen URL:", response.data.imageUrl);
        setImage(response.data.imageUrl);
      } catch (err) {
        // Manejo de errores si la carga falla
        message.error("Error al cargar la imagen");
        console.error("Error al subir la imagen:", err);
      }

      // Prevent upload from happening right away
      return false;
    },
    showUploadList: false,
  };

  return (
    <>
      <div className="user-container">
        <div className="user-content">
          <Form name="userDetails" onSubmit={handleRegister} layout="vertical">
            <h2></h2>
            <Typography.Title level={2} className="profileTitle">
              Perfil
            </Typography.Title>
            <Form.Item label="Imagen" name="userimage">
              {/* {loading ? <Skeleton.Image /> : null} */}
              <Upload {...uploadProps}>
                <Skeleton.Image />
                <br></br>
                <br></br>
                <Button icon={<UploadOutlined />}>Seleccionar imagen</Button>
              </Upload>
            </Form.Item>
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
              rules={[
                { required: true, message: "Por favor ingresa tu nombre" },
              ]}
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
              <Input value={email} onChange={handleEmailChange} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleRegister}
                disabled={!isFormValid}
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
            {user && (
              <Alert
                type="success"
                message={`Usuario actualizad con éxito: ${user.username}`}
                banner
              />
            )}
          </Form>
          <LoginFooter />
        </div>
      </div>
    </>
  );
};

export default UserDetails;
