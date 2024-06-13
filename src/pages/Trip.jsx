import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Button, Carousel, Alert } from "antd";
import { format } from "date-fns";
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
  const formatDate = (date) => {
    return date ? format(new Date(date), "yyyy-MM-dd") : "";
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
        setStartDate(formatDate(response.data.startDate));
        setEndDate(formatDate(response.data.endDate));
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
      <div>
        <div className="travelTitle">
          <Typography.Title level={2}>{title}</Typography.Title>
          <p>{formatDate(startDate) + " - " + formatDate(endDate)}</p>
        </div>
        <p>{description}</p>
        <p>
          Integrantes del grupo: {users.map((user) => user.username).join(", ")}
        </p>
        <Button onClick={() => updateTrip(id)}>editar</Button>
        <Button>añadir integrantes</Button>

        <Button onClick={handleAddCategoryClick}>añadir categoría</Button>
        {isAddingCategory && (
          <input
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
      {/* onNavigate={changeToDone} onDelete={()=>deleteTaskAndSync(tarea._id)} onEdit={viewEditTarea} */}
      <div className="carrusel">
        <Carousel autoplay arrows infinite={false} afterChange={onChange}>
          {categories.map((category) => (
            <div key={category._id}>
              <h3 className="categoryStyle">{category.title}</h3>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

