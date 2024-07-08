import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Alert, notification, Button } from "antd";
import { format } from "date-fns";
import { UserOutlined } from "@ant-design/icons";
import tripAPI from "../apiservice/tripApi";
import "../styles/Trip.css";
import UnlinkUser from "../components/tripDetails/UnlinkUserFromTripButton";
import AddCategoryModal from "../components/CreateCategoryModal";
import DeleteTrip from "../components/tripDetails/DeleteTripButton";
import EditTrip from "../components/tripDetails/EditTripButton";

export default function Trip() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [users, setUsers] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const [error, setError] = useState("");

  const formatDate = (date) => {
    return date ? format(new Date(date), "dd/MM/yyyy") : "";
  };

  const { id } = useParams(); // Obtener el ID del trip desde los parámetros de la ruta

  const getTripById = async (id) => {
    try {
      const response = await tripAPI.getTripInfo(id);
      if (response.data) {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setStartDate(response.data.startDate);
        setEndDate(response.data.endDate);
        setUsers(response.data.users);
      } else if (response.error) {
        setError(response.error);
      }
    } catch (error) {
      setError(`Error fetching trip: ${error.message}`);
    }
  };

  const generateInvitationLink = () => {
    const inviteLink = `${window.location.origin}/join-trip/${id}`;
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => {
        notification.success({
          message: "Enlace copiado al portapapeles",
          description: `Comparte el enlace para que tus compañeros de viaje puedan empezar a añadir propuestas.`,
          placement: "topRight",
        });
      })
      .catch((err) => {
        notification.error({
          message: "Error",
          description: "No se pudo copiar al portapapeles.",
          placement: "topRight",
        });
        console.error("No se pudo copiar al portapapeles: ", err);
      });
  };

  useEffect(() => {
    getTripById(id);
  }, [id]);

  return (
    <div>
      <AddCategoryModal tripId={id} getTripById={getTripById} />
      <div>
        <Typography.Title level={3}>¿Cuándo?</Typography.Title>
        <Typography.Text level={3}>
          Del {formatDate(startDate)} al {formatDate(endDate)}.
        </Typography.Text>
        <Typography.Title level={3}>¿Dónde?</Typography.Title>
        <Typography.Text level={3}>A {title}.</Typography.Text>
        <Typography.Title level={3}>¿Algo más?</Typography.Title>
        <Typography.Text level={3}>{description}</Typography.Text>
        <Typography.Title level={3}>¿Quién va?</Typography.Title>
        <Typography.Text level={3}>
          <UserOutlined />
          {"    "}
          {users.map((user) => user.username).join(", ")}
        </Typography.Text>
        <br />
        <br />
        <br />
        <Button
          style={{ marginRight: "10px" }}
          onClick={generateInvitationLink}
          type="dashed"
        >
          Añadir viajeros
        </Button>
        <EditTrip />
        {users.length > 1 ? (
          <UnlinkUser tripId={id} />
        ) : (
          <DeleteTrip tripId={id} />
        )}
        {error && (
          <Alert
            type="error"
            message={error}
            closable
            onClose={() => setError("")}
          />
        )}
      </div>
    </div>
  );
}
