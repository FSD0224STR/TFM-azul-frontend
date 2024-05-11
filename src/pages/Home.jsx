import { useContext, useEffect, useState } from "react";
import { Card, Typography, Spin, Row, Col, Input, Button, Alert } from "antd";

import tripAPI from "../apiservice/tripApi";
import { AuthContext } from "../contexts/authContext";
import { TripCard } from "../components/TripCard";

function Home() {
  const [trips, setTrips] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);

  const getTrips = async () => {
    try {
      setLoading(true);
      const response = await tripAPI.getAllTrips();
      setTrips(response.data);
    } catch (error) {
      setError(`Error fetching trips: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const addTrip = async () => {
    try {
      setLoading(true);
      const response = await tripAPI.addTrip({ title });
      setTrips([...trips, response.data]);
      setTitle("");
    } catch (error) {
      setError(`Error adding trip: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteTrip = async (idToDelete) => {
    try {
      setLoading(true);
      await tripAPI.deleteTrip(idToDelete);
      setTrips(trips.filter((trip) => trip._id !== idToDelete));
    } catch (error) {
      setError(`Error deleting trip: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrips();
  }, []);

  return (
    <div style={{ marginTop: "10vh", maxWidth: "md" }}>
      <Card style={{ padding: 16 }}>
        <Typography.Title level={2} style={{ marginBottom: 24 }}>
          Lista de viajes
        </Typography.Title>
        {loading ? (
          <Spin />
        ) : Array.isArray(trips) && trips.length > 0 ? (
          <div>
            {trips.map((trip) => (
              <Card
                key={trip._id}
                style={{ marginBottom: 16, width: "100%" }}
                xs={24}
                sm={12}
              >
                <TripCard
                  key={trip._id}
                  title={trip.title}
                  start_date={trip.start_date}
                  end_date={trip.end_date}
                  user={trip.user}
                  onDelete={() => deleteTrip(trip._id)}
                ></TripCard>
              </Card>
            ))}
          </div>
        ) : (
          <Typography.Text>No trips found.</Typography.Text>
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>

            <Col xs={24} sm={12}>
              {loading ? (
                <Spin />
              ) : (
                <Button type="primary" onClick={addTrip}>
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
