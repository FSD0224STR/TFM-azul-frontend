import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import tripApi from "../apiservice/tripApi";
import LoginModal from "../components/LoginModal";
import { Typography, Button, Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import "../styles/JoinTrip.css";

const { Title, Text } = Typography;

const JoinTripPage = () => {
  const { id } = useParams();
  const { isLoggedIn } = useContext(AuthContext);
  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState(null);
  const [tripTitle, setTripTitle] = useState("");
  const [tripOwner, setTripOwner] = useState("");
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [returnUrl, setReturnUrl] = useState("");
  const navigate = useNavigate();

  const showLoginModal = () => {
    setIsLoginModalVisible(true);
  };

  const hideLoginModal = () => {
    setIsLoginModalVisible(false);
  };

  const handleJoinTrip = async () => {
    try {
      setJoining(true);
      const response = await tripApi.linkUserToTrip(id);

      if (response.error) {
        console.error("Error al vincular usuario al viaje:", response.error);
        setJoinError("Ups... " + response.error);
      } else {
        console.log("Éxito:", response);
        // Redirigir al usuario a la página del viaje correspondiente
        navigate(`/${id}`); // Redirigir al usuario a la página del viaje
      }
    } catch (error) {
      console.error("Error inesperado:", error);
      setJoinError(
        "Error inesperado. Por favor, intenta nuevamente más tarde."
      );
    } finally {
      setJoining(false);
    }
  };

  const handleLoginAndJoin = () => {
    const returnUrl = `/join-trip/${id}`;
    setReturnUrl(returnUrl);
    showLoginModal();
  };

  const handleLoginSuccess = (returnUrl) => {
    hideLoginModal();
    if (returnUrl) {
      window.location.href = returnUrl; // Redirigir al usuario a la URL de retorno
    } else {
      navigate("/home"); // Redirigir al usuario a la página de viajes que tiene
    }
  };

  const fetchTripDetails = async () => {
    try {
      const response = await tripApi.getTripInfo(id);
      if (response.data) {
        setTripTitle(response.data.title);
        setTripOwner(response.data.owner.username); // Suponiendo que la respuesta contiene el nombre del propietario en response.data.owner.username
      }
    } catch (error) {
      console.error("Error fetching trip details:", error);
    }
  };

  useEffect(() => {
    fetchTripDetails();
  }, [id]);

  return (
    <div>
      <div className="breadcrumbContainer">
        <Breadcrumb
          items={[
            {
              href: "../",
              title: <HomeOutlined />,
            },
            {
              title: `Invitación a un nuevo viaje`,
            },
          ]}
        />
      </div>
      <div className="joinTripPage cardInfoTrip">
        <Title level={5}>
          Parece que {tripOwner ? tripOwner : "alguien"} quiere organizar un
          viaje contigo a...
        </Title>
        <Title className="joinTrip" level={2}>
          {tripTitle ? tripTitle : "algún lugar"}
        </Title>
        {!isLoggedIn ? (
          <div className="joinTripContent">
            <Text>
              Debes iniciar sesión o registrarte para unirte al viaje.
            </Text>
            <div className="joinTrip-btn">
              <Button type="primary" onClick={handleLoginAndJoin}>
                Iniciar sesión / Registrarse
              </Button>
            </div>
          </div>
        ) : (
          <div className="joinTripContent">
            <Text>
              Haz clic en el botón si quieres unirte al viaje y empezar a añadir
              propuestas:
            </Text>
            <div className="joinTrip-btn">
              <Button
                type="primary"
                onClick={handleJoinTrip}
                disabled={joining}
              >
                {joining ? "Uniendo..." : "Sí, quiero"}
              </Button>
            </div>
            {joinError && <Text type="danger">{joinError}</Text>}
          </div>
        )}

        {/* Renderizar el modal de inicio de sesión */}
        <LoginModal
          isModalVisible={isLoginModalVisible}
          handleCancel={hideLoginModal}
          handleLoginSuccess={handleLoginSuccess}
          returnUrl={returnUrl} // Pasar returnUrl como prop
        />
      </div>
    </div>
  );
};

export default JoinTripPage;
