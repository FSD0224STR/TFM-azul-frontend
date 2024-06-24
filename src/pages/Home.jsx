import { useContext, useEffect, useState } from "react";
import { Typography, Spin, Row, Col, Alert, Modal } from "antd";

import tripAPI from "../apiservice/tripApi";
import { AuthContext } from "../contexts/authContext";
import { TripCard } from "../components/TripCard";

import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import CreateTripModal from "../components/CreateTripModal";

function Home() {
  const [trips, setTrips] = useState([]);
  //const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const showErrorModal = (message) => {
    Modal.error({
      title: 'Error',
      content: message,
    });
  };

  
  const getTrips = async () => {
    try {
      setLoading(true);
      const response = await tripAPI.getAllTrips();
      //console.log(response);
      setTrips(response.data);
    } catch (error) {
      setError(`Error fetching trips: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // const goAddTrip = () => {
  //   navigate("/tripInfo");
  // };

  const deleteTrip = async (idToDelete) => {
    try {
      setLoading(true);
      const response = await tripAPI.deleteTrip(idToDelete);

      if (response.error) {
        setError(response.error);
        console.log(response.error);
        showErrorModal(response.error);
      } else {
        console.log(response.data);
        setTrips(trips.filter((trip) => trip._id !== idToDelete));
      }
      } catch (error) {
      setError(`Error deleting trip: ${error.message}`);
      showErrorModal(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateTrip = (idToUpdate) => {
    navigate(`/tripInfo/${idToUpdate}`);
  };

  const goToTrip = (idToGo) => {
    navigate(`/${idToGo}`);
  };

  useEffect(() => {
    getTrips();
  }, []);

  return (
    // style={{ marginTop: "10vh", maxWidth: "md" }}
    <div className="tripContainer">
      <div>
        {/* <Typography.Title level={2}>Lista de viajes</Typography.Title> */}
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
                owner={trip.owner.username}
                onDelete={() => deleteTrip(trip._id)}
                onEdit={() => updateTrip(trip._id)}
                onView={() => goToTrip(trip._id)}
              ></TripCard>
            ))}
          </div>
        ) : (
          <Typography.Text>No trips found.</Typography.Text>
        )}
      </div>
      {isLoggedIn ? (
        <>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              {loading ? <Spin /> : <CreateTripModal />}
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
