import { useState, useContext } from "react";
import { Modal, Button, Spin, Alert, Input } from "antd";
import { AuthContext } from "../contexts/authContext";
import { LoginFooter } from "./LoginFooter";

const LoginModal = ({
  isModalVisible,
  handleCancel,
  handleLoginSuccess,
  returnUrl,
}) => {
  const { login, loading, error, setError } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleOk = async () => {
    try {
      await login(username, password);
      handleLoginSuccess(returnUrl);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegisterClick = () => {
    handleCancel();
  };

  return (
    <Modal
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary" onClick={handleOk}>
          {loading ? <Spin /> : "Iniciar sesión"}
        </Button>,
      ]}
      className="custom-modal"
    >
      <div className="modal-content">
        <Input
          className="input"
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <Input.Password
          className="input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        {error && (
          <div className="error-container">
            <Alert
              type="error"
              message={error}
              closable
              onClose={() => setError("")}
            />
          </div>
        )}
      </div>
      <LoginFooter onRegisterClick={handleRegisterClick} />
    </Modal>
  );
};

export default LoginModal;
