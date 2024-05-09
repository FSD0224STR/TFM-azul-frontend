import { useContext, useEffect, useState } from "react";
import { Typography, Spin, Row, Col, Input, Button, Alert } from "antd";

import tripAPI from "../apiservice/tripApi";
import { AuthContext } from "../contexts/authContext";

function Home() {
  const [trips, setTrips] = useState([]);

  const { isLoggedIn } = useContext(AuthContext);

  const [title, setTitle] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [dummy, refresh] = useState(false);

  const getTrips = async () => {
    setLoading(true);
    const response = await tripAPI.getAllTrips();
    if (response.error) setError(response.error);
    else setTrips(response.data);
    setLoading(false);
  };

  const addTripAndSync = async () => {
    setLoading(true);
    const response = await tripAPI.addTrip({ title });
    if (response.error) setError(response.error);
    else refresh(!dummy);
    setLoading(false);
  };

  // const deleteTripAndSync = async (idToDelete) => {
  //   setLoading(true);
  //   const response = await tripAPI
  //     .deleteTrip(idToDelete)
  //     .then(() => refresh(!dummy));
  //   if (response.error) setError(response.error);
  //   else refresh(!dummy);
  //   setLoading(false);
  // };

  useEffect(() => {
    getTrips();
  }, [dummy]);

  return (
    <div style={{ marginTop: "10vh", maxWidth: "md" }}>
      {isLoggedIn ? (
        <>
          <Typography.Title level={3} style={{ marginTop: "1em" }}>
            Añadir viaje
          </Typography.Title>
          <Row gutter={[16, 16]} style={{ marginTop: "1em" }}>
            <Col xs={24} sm={12}>
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>
            <Col xs={24} sm={12}>
              {loading ? (
                <Spin />
              ) : (
                <Button type="primary" onClick={addTripAndSync}>
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
