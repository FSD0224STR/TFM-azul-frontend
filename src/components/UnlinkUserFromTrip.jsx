import { useEffect, useState } from "react";
import tripApi from "../apiservice/tripApi";
import userApi from "../apiservice/userApi";
import { Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";

const UnlinkUser = ({ tripId }) => {
  const [userId, setUserId] = useState(null);
  const [trip, setTrip] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userInfo = await userApi.getMyProfile();
      console.log("userInfo", userInfo);
      if (userInfo) {
        setUserId(userInfo.data._id);
      }
    };

    fetchUserData();
  }, []);

  const handleUnlink = async () => {
    console.log("Button clicked");
    if (userId) {
      console.log("User ID:", userId);
      console.log("Trip ID:", tripId);
      try {
        const result = await tripApi.unlinkUserFromTrip(tripId, userId);
        if (result) {
          console.log("Unlink result:", result);
          alert(result.message);
          setTrip((prevTrip) => ({
            ...prevTrip,
            users: prevTrip.users.filter((user) => user !== userId),
          }));
          navigate("/home");
        }
      } catch (error) {
        console.error("Error al desvincular usuario:", error);
      }
    }
  };

  return (
    <Popconfirm
      title="¿Estás seguro de que quieres desvincularte del viaje?"
      onConfirm={handleUnlink}
      okText="Sí"
      cancelText="No"
    >
      <button>Desvincularme del viaje</button>
    </Popconfirm>
  );
};

export default UnlinkUser;
