import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Alert, Tooltip } from "antd";
import { format } from "date-fns";
import es from "date-fns/locale/es";
import { TeamOutlined, UserAddOutlined } from "@ant-design/icons";
import tripAPI from "../apiservice/tripApi";
import { CategoryCard } from "../components/CategoryCard";
import "../styles/Trip.css";
import UnlinkUser from "../components/UnlinkUserFromTrip";
import AddCategoryModal from "../components/CreateCategoryModal";

export function Trip() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const [error, setError] = useState("");

  const startDateFormatted = (date) => {
    return date ? format(new Date(date), "d MMM", { locale: es }) : "";
  };

  const endDateFormatted = (date) => {
    return date ? format(new Date(date), "d MMM", { locale: es }) : "";
  };

  const yearDateFormatted = (date) => {
    return date ? format(new Date(date), "yyyy", { locale: es }) : "";
  };

  //recogemos el id de la ruta
  const { id } = useParams();

  //llamada a la api para obtener los datos de ese viaje
  const getTripById = async (id) => {
    console.log("Este es el getTripById ", id);

    try {
      const response = await tripAPI.getTripInfo(id);
      console.log("esta es la respuesta", response);
      if (response.data) {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setStartDate(response.data.startDate);
        setEndDate(response.data.endDate);
        setUsers(response.data.users);
        setCategories(response.data.categories);
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
        alert("Enlace copiado al portapapeles: " + inviteLink);
      })
      .catch((err) => {
        console.error("No se pudo copiar al portapapeles: ", err);
      });
  };

  //Pintamos el viaje nada más arrancar la página
  useEffect(() => {
    getTripById(id);
  }, []);

  return (
    <div>
      <AddCategoryModal tripId={id} getTripById={getTripById} />
      <div className="cardInfoTrip">
        <div className="cabecera">
          <Typography.Title level={2}>{title}</Typography.Title>
          <Tooltip title="Copiar enlace de invitación">
            <UserAddOutlined
              onClick={generateInvitationLink}
              className="icon-size"
            />
          </Tooltip>
        </div>
        <div className="unlink-btn">
          <UnlinkUser tripId={id} />
        </div>
        <div className="description">
          <p>
            {"Del " +
              startDateFormatted(startDate) +
              " al " +
              endDateFormatted(endDate) +
              " de " +
              yearDateFormatted(endDate)}
          </p>

          <p>{description}</p>
        </div>
        <p>
          <TeamOutlined /> {users.map((user) => user.username).join(", ")}
        </p>
        <div className="categoryCardList ">
          {categories.map((categoria) => (
            <CategoryCard
              key={categoria._id}
              id={categoria._id}
              title={categoria.title}
              refreshCategories={() => getTripById(id)} // Pasar la función de actualización como prop
            ></CategoryCard>
          ))}
        </div>
        {isAddingCategory && (
          <input
            className="newCategoryInput tripInfo"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Nombre de la categoría"
          />
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
