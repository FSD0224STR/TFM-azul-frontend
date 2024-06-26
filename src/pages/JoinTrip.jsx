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
  const navigate = useNavigate();
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [pendingJoinTrip, setPendingJoinTrip] = useState(null);
  const [returnUrl, setReturnUrl] = useState("");

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

  useEffect(() => {
    const returnUrl = new URLSearchParams(window.location.search).get(
      "returnUrl"
    );
    if (returnUrl) {
      setPendingJoinTrip(returnUrl);
    }
  }, []);

  return (
    <div className="joinTripPage">
      <h2>Unirse al viaje</h2>
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
          <p>¡Haz clic en el botón para unirte al viaje!</p>
          <button onClick={handleJoinTrip} disabled={joining}>
            {joining ? "Uniendo..." : "Unirse al viaje"}
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
