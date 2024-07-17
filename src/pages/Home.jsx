import { useContext, useEffect, useState } from "react";
import {
  Typography,
  Spin,
  Row,
  Col,
  Alert,
  Button,
  Tooltip,
  Breadcrumb,
} from "antd";
import { PlusOutlined, HomeOutlined } from "@ant-design/icons";

import tripAPI from "../apiservice/tripApi";
import { AuthContext } from "../contexts/authContext";
import { TripCard } from "../components/TripCard";
import CreateTripModal from "../components/CreateTripModal";

import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [editingTrip, setEditingTrip] = useState(null); // Estado para el viaje que se está editando

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

  const updateTrip = (idToUpdate) => {
    const tripToUpdate = trips.find((trip) => trip._id === idToUpdate);
    if (tripToUpdate) {
      setEditingTrip(tripToUpdate); // Actualiza el estado con el viaje que se está editando
      setIsModalVisible(true); // Abre el modal de edición
    }
  };

  const goToTrip = (idToGo) => {
    navigate(`/trip/${idToGo}`);
  };

  const handleCreateTrip = () => {
    setEditingTrip(null); // Asegura que no haya ningún viaje en edición cuando se cree uno nuevo
    setIsModalVisible(true); // Abre el modal de creación
  };

  const handleModalCancel = () => {
    setIsModalVisible(false); // Cierra el modal
  };

  const handleTripUpdate = async () => {
    setIsModalVisible(false); // Cierra el modal después de actualizar
    await getTrips(); // Vuelve a obtener la lista de viajes actualizada
  };

  useEffect(() => {
    getTrips();
  }, []);

  return (
    <div className="tripContainer">
      <Breadcrumb
        items={[
          {
            title: <HomeOutlined />,
          },
        ]}
      />
      <div>
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
                onEdit={() => updateTrip(trip._id)}
                onView={() => goToTrip(trip._id)}
              ></TripCard>
            ))}
          </div>
        ) : (
          <Typography.Text>No se han encontrado viajes.</Typography.Text>
        )}
      </div>
      {isLoggedIn ? (
        <>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <CreateTripModal
                visible={isModalVisible}
                onCancel={handleModalCancel}
                editingTrip={editingTrip}
                onUpdate={handleTripUpdate}
              />
            </Col>
          </Row>
          {/* Botón flotante para abrir modal de creación */}
          <Tooltip title="Crear Nuevo Viaje">
            <Button
              type="primary"
              shape="circle"
              size="large"
              icon={<PlusOutlined />}
              onClick={handleCreateTrip}
              style={{
                width: "64px",
                height: "64px",
                lineHeight: "64px",
                textAlign: "center",
                position: "fixed",
                bottom: 20,
                right: 20,
              }}
            />
          </Tooltip>
        </>
      ) : (
        <Typography.Text>
          Por favor, regístrate o inicia sesión.
        </Typography.Text>
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
