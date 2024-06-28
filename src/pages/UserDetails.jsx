import { useState, useContext, useEffect } from "react";
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
import { AuthContext } from "/src/contexts/authContext";
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

  const authContext = useContext(AuthContext);
  const { profile, updateProfile } = authContext;

  useEffect(() => {
    if (profile) {
      console.log("profile", profile);

      setFirstname(profile.firstname);
      setLastname(profile.lastname);
      setUsername(profile.username);
      setEmail(profile.email);
      setImage(profile.imageUrl || ""); // Asegúrate de inicializar image correctamente
    }
  }, [profile]);

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    switch (field) {
      case "username":
        setUsername(value);
        break;
      case "firstname":
        setFirstname(value);
        break;
      case "lastname":
        setLastname(value);
        break;
      case "email":
        setEmail(value);
        break;
      default:
        break;
    }
  };

  const handleFileChange = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await userApi.addNewImage(formData);

      message.success("Imagen cargada con éxito!");
      setImage(response.data.imageUrl);
    } catch (err) {
      message.error("Error al cargar la imagen");
      console.error("Error al subir la imagen:", err);
    }
  };

  const handleSaveChanges = async () => {
    try {
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
        updateProfile(response.data); // Actualizar el perfil en el contexto si es necesario
        message.success("Perfil actualizado con éxito");
      }
    } catch (error) {
      setError(error.message || "Error desconocido al guardar cambios");
    }
  };

  const uploadProps = {
    fileList: [],
    beforeUpload: handleFileChange,
    showUploadList: false,
  };

  return (
    <>
      <div className="user-container">
        <div className="user-content">
          <Typography.Title level={2} className="profileTitle">
            Perfil
          </Typography.Title>
          <div className="profile-section">
            <div className="profile-image">
              {image ? (
                <img src={image} alt="Profile" className="image-container" />
              ) : (
                <Skeleton.Image className="image-container" />
              )}
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Seleccionar imagen</Button>
              </Upload>
            </div>
            <div className="form-details">
              <Form layout="vertical">
                <Form.Item
                  label="Nombre de usuario"
                  // name="username"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingresa tu Nombre de usuario",
                    },
                  ]}
                >
                  <Input
                    value={username}
                    onChange={(e) => handleInputChange(e, "username")}
                  />
                </Form.Item>
                <Form.Item
                  label="Nombre"
                  // name="firstname"
                  rules={[
                    { required: true, message: "Por favor ingresa tu nombre" },
                  ]}
                >
                  <Input
                    value={firstname}
                    onChange={(e) => handleInputChange(e, "firstname")}
                  />
                </Form.Item>
                <Form.Item
                  label="Apellidos"
                  // name="surname"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingresa tus apellidos",
                    },
                  ]}
                >
                  <Input
                    value={lastname}
                    onChange={(e) => handleInputChange(e, "lastname")}
                  />
                </Form.Item>
                <Form.Item
                  label="Correo electrónico"
                  // name="correo"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingresa tu correo electrónico",
                    },
                  ]}
                >
                  <Input
                    value={email}
                    onChange={(e) => handleInputChange(e, "email")}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    onClick={handleSaveChanges}
                    disabled={!email || error}
                  >
                    Guardar cambios
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
          {error && (
            <div className="registerAlert">
              <Alert
                type="error"
                message={`Error al actualizar usuario: ${error}`}
                banner
              />
            </div>
          )}
          {user && (
            <Alert
              type="success"
              message={`Usuario actualizado con éxito: ${user.username}`}
              banner
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UserDetails;
