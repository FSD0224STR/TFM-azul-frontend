import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import tripApi from "../apiservice/tripApi";
import LoginModal from "../components/LoginModal";

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
        setJoinError(
          "Error al unirse al viaje. Por favor, intenta nuevamente."
        );
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
      navigate("/"); // Redirigir al usuario a la página de viajes que tiene
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
    <div className="joinTripPage cardInfoTrip">
      <h4>Parece que {tripOwner} quiere organizar un viaje contigo a...</h4>
      <h2>{tripTitle}</h2>
      {!isLoggedIn ? (
        <div>
          <p>Debes iniciar sesión o registrarte para unirte al viaje.</p>
          <button onClick={handleLoginAndJoin}>
            Iniciar sesión / Registrarse
          </button>
          {/* Aquí podrías agregar botones para iniciar sesión o registrarse */}
        </div>
      ) : (
        <div>
          <p>
            Haz clic en el botón si quieres unirte al viaje y empezar a añadir
            propuestas:
          </p>
          <button onClick={handleJoinTrip} disabled={joining}>
            {joining ? "Uniendo..." : "Sí, quiero"}
          </button>
          {joinError && <p>{joinError}</p>}
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
  );
};

export default JoinTripPage;
