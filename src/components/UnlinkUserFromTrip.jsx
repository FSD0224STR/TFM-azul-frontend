import { useEffect, useState } from "react";
import tripApi from "../apiservice/tripApi";
import userApi from "../apiservice/userApi";
import { Popconfirm, notification } from "antd";
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
          notification.success({
            message: "Ya no formas parte del viaje",
            description: result.message,
            placement: "topRight",
          });
          setTrip((prevTrip) => ({
            ...prevTrip,
            users: prevTrip.users.filter((user) => user !== userId),
          }));
          navigate("/home");
        }
      } catch (error) {
        console.error("Error al desvincular usuario:", error);
        notification.error({
          message: "Error al desvincular usuario",
          description: error.message,
          placement: "topRight",
        });
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
      <button className="unlink-btn">Desvincularme del viaje</button>
    </Popconfirm>
  );
};

export default UnlinkUser;
