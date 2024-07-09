import { useState, useContext, useEffect } from "react";
import {
  Typography,
  Form,
  Input,
  Button,
  Upload,
  Skeleton,
  message,
  Modal,
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
  const [imageUrl, setImage] = useState("");

  const authContext = useContext(AuthContext);
  const { profile } = authContext;

  useEffect(() => {
    if (profile) {
      console.log("profile", profile);

      setFirstname(profile.firstname);
      setLastname(profile.lastname);
      setUsername(profile.username);
      setEmail(profile.email);
      setImage(profile.imageUrl || "");
    }
  }, [profile]);

  const showErrorModal = (message) => {
    Modal.error({
      title: "Error",
      content: message,
    });
  };

  const showSuccessModal = (message) => {
    Modal.success({
      content: message,
    });
  };

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
        profile._id,
        firstname,
        lastname,
        username,
        email,
        imageUrl
      );
      if ("error" in response) {
        showErrorModal(response.error.msg);
      } else {
        showSuccessModal(`¡Usuario ${profile.username} actualizado con éxito!`);
      }
    } catch (error) {
      showErrorModal(error.message || "Error desconocido al guardar cambios");
    }
  };

  const uploadProps = {
    fileList: [],
    beforeUpload: handleFileChange,
    showUploadList: false,
  };

  const isFormValid = username && firstname && lastname && email;

  return (
    <>
      <div className="">
        <div className="">
          <Typography.Title level={2} className="profileTitle">
            Perfil
          </Typography.Title>
          <div className="profile-section">
            <div className="profile-image">
              {imageUrl ? (
                <img src={imageUrl} alt="Profile" className="image-container" />
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
                  {" "}
                  <div className="required"></div>
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
                    disabled={!isFormValid}
                  >
                    Guardar cambios
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
