import { useContext, useState } from "react";
import { LoginFooter } from "/src/components/LoginFooter";
import { Card, Typography, Spin, Row, Col, Input, Button, Alert } from "antd";
import { AuthContext } from "../contexts/authContext";
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error, setError } = useContext(AuthContext);

  return (
    /* xs={24} sm={12}  md={8} lg={6}  */
    <>
      <div className="container">
        <div className="content">
          <Card className="loginCard">
            <Typography.Title level={2}>Bienvenido</Typography.Title>
            <Row gutter={[16, 16]} justify="center">
              <Col xs={24} className="inputRow">
                <Input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.currentTarget.value)}
                />
              </Col>
              <Col xs={24} className="inputRow">
                <Input.Password
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
              </Col>
            </Row>
            <div className="buttonContainer">
              {loading ? (
                <Spin />
              ) : (
                <Button
                  type="primary"
                  onClick={() => login(username, password)}
                  block
                >
                  Login
                </Button>
              )}
            </div>
          </Card>
          {error && (
            <Alert
              type="error"
              message={error}
              closable
              onClose={() => setError("")}
            />
          )}
          <LoginFooter />
        </div>
      </div>
    </>
  );
};

export default Login;
