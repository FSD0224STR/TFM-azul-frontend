import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Spin, Row, Col, Alert, Modal, Select, Input } from "antd";

import tripAPI from "../apiservice/tripApi";

import { AuthContext } from "../contexts/authContext";

import { TripCard } from "../components/TripCard";
import CreateTripModal from "../components/CreateTripModal";
import FloatingButton from "../components/FloatingButton";

import "../styles/Home.css";

const { Option } = Select;
const { Search } = Input;

function Home() {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [editingTrip, setEditingTrip] = useState(null); // Estado para el viaje que se está editando
  const [filter, setFilter] = useState({ search: "", owner: "" }); // Estado para los filtros

  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const showErrorModal = (message) => {
    Modal.error({
      title: "Error",
      content: message,
    });
  };

  const getTrips = async () => {
    try {
      setLoading(true);
      const response = await tripAPI.getAllTrips();
      setTrips(response.data);
      setFilteredTrips(response.data); // Inicialmente, los viajes filtrados son todos los viajes
    } catch (error) {
      setError(`Error fetching trips: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteTrip = async (idToDelete) => {
    try {
      setLoading(true);
      const response = await tripAPI.deleteTrip(idToDelete);

      if (response.error) {
        setError(response.error);
        showErrorModal(response.error);
      } else {
        setTrips(trips.filter((trip) => trip._id !== idToDelete));
        setFilteredTrips(
          filteredTrips.filter((trip) => trip._id !== idToDelete)
        ); // También actualiza los viajes filtrados
      }
    } catch (error) {
      setError(`Error deleting trip: ${error.message}`);
      showErrorModal(error.message);
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
    navigate(`/${idToGo}`);
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

  const handleFilterChange = (value, field) => {
    setFilter((prev) => ({ ...prev, [field]: value }));
  };

  const filterTrips = () => {
    const { search, owner } = filter;
    const filtered = trips.filter((trip) => {
      const matchesSearch = search
        ? trip.title.toLowerCase().includes(search.toLowerCase())
        : true;
      const matchesOwner = owner ? trip.owner.username === owner : true;
      return matchesSearch && matchesOwner;
    });
    setFilteredTrips(filtered);
  };

  useEffect(() => {
    getTrips();
  }, []);

  useEffect(() => {
    filterTrips();
  }, [filter, trips]);

  return (
    <div className="cardInfoTrip">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Search
            placeholder="Buscar por título"
            onSearch={(value) => handleFilterChange(value, "search")}
            enterButton
          />
        </Col>
        <Col xs={24} sm={12}>
          <Select
            placeholder="Filtrar por dueño"
            style={{ width: "100%" }}
            onChange={(value) => handleFilterChange(value, "owner")}
          >
            {Array.from(new Set(trips.map((trip) => trip.owner.username))).map(
              (owner) => (
                <Option key={owner} value={owner}>
                  {owner}
                </Option>
              )
            )}
          </Select>
        </Col>
      </Row>

      <div style={{ marginTop: 20 }}>
        {loading ? (
          <Spin />
        ) : Array.isArray(filteredTrips) && filteredTrips.length > 0 ? (
          <div className="">
            {filteredTrips.map((trip) => (
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
          <FloatingButton
            onClick={handleCreateTrip}
            tooltipTitle="Nuevo viaje"
          />
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
