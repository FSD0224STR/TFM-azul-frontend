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
  Input,
  Select,
} from "antd";
import { PlusOutlined, HomeOutlined } from "@ant-design/icons";

import tripAPI from "../apiservice/tripApi";
import { AuthContext } from "../contexts/authContext";
import { TripCard } from "../components/TripCard";
import CreateTripModal from "../components/CreateTripModal";

import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

function Home() {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [uniqueOwners, setUniqueOwners] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedOwner, setSelectedOwner] = useState("");

  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const getTrips = async () => {
    try {
      setLoading(true);
      const response = await tripAPI.getAllTrips();
      setTrips(response.data);
      setFilteredTrips(response.data);
      extractUniqueOwners(response.data);
    } catch (error) {
      setError(`Error fetching trips: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const extractUniqueOwners = (trips) => {
    const owners = Array.from(
      new Set(trips.map((trip) => trip.owner.username))
    );
    setUniqueOwners(owners);
  };

  const updateTrip = (idToUpdate) => {
    const tripToUpdate = trips.find((trip) => trip._id === idToUpdate);
    if (tripToUpdate) {
      setEditingTrip(tripToUpdate);
      setIsModalVisible(true);
    }
  };

  const goToTrip = (idToGo) => {
    navigate(`/trip/${idToGo}`);
  };

  const handleCreateTrip = () => {
    setEditingTrip(null);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleTripUpdate = async () => {
    setIsModalVisible(false);
    await getTrips();
  };

  const handleSearchTitleChange = (e) => {
    setSearchTitle(e.target.value);
  };

  const handleOwnerChange = (value) => {
    setSelectedOwner(value);
  };

  const filterTrips = () => {
    let filtered = trips;
    if (searchTitle) {
      filtered = filtered.filter((trip) =>
        trip.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }
    if (selectedOwner) {
      filtered = filtered.filter(
        (trip) => trip.owner.username === selectedOwner
      );
    }
    setFilteredTrips(filtered);
  };

  useEffect(() => {
    getTrips();
  }, []);

  useEffect(() => {
    filterTrips();
  }, [searchTitle, selectedOwner, trips]);

  return (
    <>
      <div className="breadcrumbContainer">
        <Breadcrumb
          items={[
            {
              title: <HomeOutlined />,
            },
          ]}
        />
      </div>
      <div className="cardInfoTrip">
        <div style={{ marginTop: "10px" }} className="filters">
          <Input
            placeholder="¿A dónde?"
            value={searchTitle}
            onChange={handleSearchTitleChange}
            style={{ width: "200px", marginRight: "20px" }}
          />
          <Select
            placeholder="Filtrar por propietario"
            value={selectedOwner}
            onChange={handleOwnerChange}
            style={{ width: "200px" }}
          >
            <Option value="">Todos</Option>
            {uniqueOwners.map((owner) => (
              <Option key={owner} value={owner}>
                {owner}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          {loading ? (
            <Spin />
          ) : Array.isArray(filteredTrips) && filteredTrips.length > 0 ? (
            <div className="tripPanel">
              {filteredTrips.map((trip) => (
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
    </>
  );
}

export default Home;
