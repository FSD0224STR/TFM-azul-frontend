import { useContext, useEffect, useState } from "react";
import { Card, Typography, Spin, Row, Col, Input, Button, Alert } from "antd";

import { TripCard } from "../components/TripCard";
import userAPI from "../apiservice/userApi";
import { AuthContext } from "../contexts/authContext";

function Home() {
  const [users, setUsers] = useState([]);

  const { isLoggedIn } = useContext(AuthContext);

  const [name, setName] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [dummy, refresh] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    const response = await userAPI.getAllUsers();
    if (response.error) setError(response.error);
    else setUsers(response.data);
    setLoading(false);
  };

  const addUserAndSync = async () => {
    setLoading(true);
    const response = await userAPI.addUser({ name });
    if (response.error) setError(response.error);
    else refresh(!dummy);
    setLoading(false);
  };

  const deleteUserAndSync = async (idToDelete) => {
    setLoading(true);
    const response = await userAPI
      .deleteUser(idToDelete)
      .then(() => refresh(!dummy));
    if (response.error) setError(response.error);
    else refresh(!dummy);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, [dummy]);

  return (
    <div style={{ marginTop: "10vh", maxWidth: "md" }}>
      <Card style={{ padding: "1em" }}>
        <Typography.Title
          level={2}
          style={{ marginBottom: "1em", marginTop: "1em" }}
        >
          Mis Viajes
        </Typography.Title>
        {loading ? (
          <Spin />
        ) : (
          <Row gutter={[16, 16]}>
            {users.map((user) => (
              <Col xs={24} sm={12} key={user._id}>
                <TripCard
                  key={user._id}
                  {...user}
                  onDelete={() => deleteUserAndSync(user._id)}
                />
              </Col>
            ))}
          </Row>
        )}
      </Card>
      {isLoggedIn ? (
        <>
          <Typography.Title level={3} style={{ marginTop: "1em" }}>
            Añadir viaje
          </Typography.Title>
          <Row gutter={[16, 16]} style={{ marginTop: "1em" }}>
            <Col xs={24} sm={12}>
              <Input
                placeholder="Title"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col xs={24} sm={12}>
              {loading ? (
                <Spin />
              ) : (
                <Button type="primary" onClick={addUserAndSync}>
                  Añadir Viaje
                </Button>
              )}
            </Col>
          </Row>
        </>
      ) : (
        <Typography.Title level={3} style={{ marginTop: "1em" }}>
          Para añadir viajes, por favor inicia sesión
        </Typography.Title>
      )}
      {error && (
        <Alert
          type="error"
          message={`Ha habido un error: ${error}`}
          closable
          onClose={() => setError("")}
        />
      )}
    </div>
  );
}

export default Home;
