import { useContext, useState } from "react";

import { Card, Typography, Spin, Row, Col, Input, Button, Alert } from "antd";
import { AuthContext } from "../contexts/authContext";
import NavFooter from "../components/NavFooter";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error, setError } = useContext(AuthContext);

  return (
    <div style={{ marginTop: "20vh", maxWidth: "sm" }}>
      <Card style={{ padding: "1em" }}>
        <Typography.Title
          level={2}
          style={{ marginBottom: "1em", marginTop: "1em", textAlign: "center" }}
        >
          Bienvenido
        </Typography.Title>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} style={{ textAlign: "center" }}>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
          </Col>
          <Col xs={24} sm={12} style={{ textAlign: "center" }}>
            <Input.Password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </Col>
        </Row>
        <div style={{ margin: "2em", textAlign: "center" }}>
          {loading ? (
            <Spin />
          ) : (
            <Button type="primary" onClick={() => login(username, password)}>
              Login
            </Button>
          )}
        </div>
      </Card>
      {error && (
        <Alert
          type="error"
          message={`Ha habido un error: ${error}`}
          closable
          onClose={() => setError("")}
        />
      )}
      <NavFooter />
    </div>
  );
};

export default Login;
