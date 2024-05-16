import { useContext, useEffect, useState } from "react";
import { Card, Typography, Spin, Row, Col, Input, Button, Alert } from "antd";

import tripAPI from "../apiservice/tripApi";
import { AuthContext } from "../contexts/authContext";
import { TripCard } from "../components/TripCard";

import "../styles/Home.css";
import {useNavigate } from "react-router-dom";
function Home() {
  const [trips, setTrips] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);

const navigate = useNavigate();


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

  const goAddTrip = () => {
    navigate ("/newTrip")
  }


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
      <Card>
        <Typography.Title level={2}>Lista de viajes</Typography.Title>
        {loading ? (
          <Spin />
        ) : Array.isArray(trips) && trips.length > 0 ? (
          <div className="tripPanel">
            {trips.map((trip) => (
              <TripCard
                key={trip._id}
                title={trip.title}
                startDate={trip.startDate}
                endDate={trip.endDate}
                description={trip.description}
                owner={trip.owner}
                onDelete={() => deleteTrip(trip._id)}
              ></TripCard>
            ))}
          </div>
        ) : (
          <Typography.Text>No trips found.</Typography.Text>
        )}
      </Card>
      {isLoggedIn ? (
        <>
          <Typography.Title level={3}>Añadir viaje</Typography.Title>
          <Row gutter={[16, 16]}>
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
                <Button type="primary" onClick={goAddTrip}>
                  Añadir Viaje
                </Button>
              )}
            </Col>
          </Row>
        </>
      ) : (
        <Typography.Title level={3}>
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
