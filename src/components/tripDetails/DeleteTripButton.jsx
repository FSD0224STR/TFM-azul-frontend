import { useEffect, useState } from "react";
import tripApi from "../../apiservice/tripApi";
import userApi from "../../apiservice/userApi";

import { Button, Popconfirm, notification } from "antd";

import { useNavigate } from "react-router-dom";

const DeleteTrip = ({ tripId }) => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userInfo = await userApi.getMyProfile();
        console.log("userInfo", userInfo);
        if (userInfo) {
          setUserId(userInfo.data._id);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleDelete = async () => {
    if (userId) {
      try {
        const result = await tripApi.deleteTrip(tripId, userId);
        if (result) {
          console.log("Delete result:", result);
          notification.success({
            message: "Viaje eliminado con éxito",
            description: result.message,
            placement: "topRight",
          });
          navigate("/home");
        }
      } catch (error) {
        console.error("Error al eliminar viaje:", error);
        notification.error({
          message: "Error al eliminar viaje",
          description: error.message,
          placement: "topRight",
        });
      }
    }
  };

  return (
    <Popconfirm
      title="¿Estás seguro de que quieres eliminar el viaje para siempre?"
      onConfirm={handleDelete}
      okText="Sí"
      cancelText="No"
    >
      <Button danger>Eliminar viaje</Button>
    </Popconfirm>
  );
};

export default DeleteTrip;
