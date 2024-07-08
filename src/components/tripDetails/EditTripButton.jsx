import { useEffect, useState } from "react";
import tripApi from "../../apiservice/tripApi";

import { Button, notification } from "antd";

const EditTrip = ({ tripId }) => {
  const [tripData, setTripData] = useState(null);

  useEffect(() => {
    const fetchTripData = async (id) => {
      try {
        const tripInfo = await tripApi.getTripInfo(id);
        console.log("tripInfo", tripInfo);
        if (tripInfo) {
          setTripData(tripInfo.data);
        }
      } catch (error) {
        console.error("Error fetching trip data:", error);
      }
    };

    if (tripId) {
      fetchTripData();
    }
  }, [tripId]);

  const handleEdit = async () => {
    if (tripData) {
      try {
        const result = await tripApi.updateTrip(tripData);
        if (result) {
          console.log("Edit result:", result);
          notification.success({
            message: "Viaje editado con éxito",
            description: result.message,
            placement: "topRight",
          });
        }
      } catch (error) {
        console.error("Error al editar viaje:", error);
        notification.error({
          message: "Error al editar viaje",
          description: error.message,
          placement: "topRight",
        });
      }
    } else {
      notification.warning({
        message: "Faltan datos",
        description: "No se pudo obtener la información del viaje.",
        placement: "topRight",
      });
    }
  };

  return <Button onClick={handleEdit}>Editar viaje</Button>;
};

export default EditTrip;
