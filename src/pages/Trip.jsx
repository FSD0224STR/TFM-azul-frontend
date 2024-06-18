import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Button, Alert } from "antd";
import { format } from "date-fns";
import es from "date-fns/locale/es";
import {
  UserAddOutlined,
  EditOutlined,
  PlusCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import tripAPI from "../apiservice/tripApi";
import { CategoryCard } from "../components/CategoryCard";
import "../styles/Trip.css";

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
  //   const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //Formatear la fecha
  //const formatDate = (date) => {
  // return date ? format(new Date(date), "yyyy-MM-dd") : "";
  //};

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

  //Pintamos el viaje nada más arrancar la página
  useEffect(() => {
    getTripById(id);
  }, []);

  //Función para actualizar el viaje, que te redirige a la página de editar
  const updateTrip = (idToUpdate) => {
    navigate(`/tripInfo/${idToUpdate}`);
  };

  //Función para añadir una nueva categoría al viaje
  const handleAddCategoryClick = async () => {
    if (isAddingCategory) {
      try {
        const response = await tripAPI.addCategory(id, { title: newCategory });
        console.log("esta es la respuesta", response);
        setNewCategory(response.data);
        getTripById(id);
      } catch (error) {
        setError(`Error al crear la nueva categoría: ${error.message}`);
      }
      console.log("Añadiendo la categoría -----", newCategory);
    }
    setIsAddingCategory(!isAddingCategory);
    setNewCategory("");
  };

  //Por ahora solo cuenta en que número del índice de la categoría estas, no sirve para nada por ahora, pero quizas pueda ser útil en el futuro
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <div>
      {/*Aquí se refleja la información más relevante del viaje */}
      <div className="cardInfoTrip">
        <div className="travelTitle">
          <Typography.Title level={1}>{title}</Typography.Title>
          <p className="tripDate">
            {"Del " +
              startDateFormatted(startDate) +
              " al " +
              endDateFormatted(endDate) +
              " de " +
              yearDateFormatted(endDate)}
          </p>
        </div>
        <p className="description">{description}</p>
        <p className="description">
          <TeamOutlined /> {users.map((user) => user.username).join(", ")}
        </p>
        <Button
          className="tripButton"
          onClick={() => updateTrip(id)}
          icon={<EditOutlined />}
        >
          Editar
        </Button>

        <Button className="tripButton" icon={<UserAddOutlined />}>
          Añadir viajero
        </Button>

        <Button
          className="tripButton"
          onClick={handleAddCategoryClick}
          icon={<PlusCircleOutlined />}
        >
          Añadir categoría
        </Button>

        {isAddingCategory && (
          <input
            className="newCategoryInput"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Nombre de la categoría"
          />
        )}
        {/*Este error no se si funciona */}
        {error && (
          <Alert
            type="error"
            message={error}
            closable
            onClose={() => setError("")}
          />
        )}

        {/* */}
      </div>

      {/*Aquí se reflejan las categorías del viaje */}

      <div className="categoryCardList">
        {categories.map((categoria) => (
          <CategoryCard
            key={categoria._id}
            id={categoria._id}
            title={categoria.title}
            refreshCategories={() => getTripById(id)} // Pasar la función de actualización como prop
          ></CategoryCard>
        ))}
      </div>
    </div>
  );
}
