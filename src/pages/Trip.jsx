
import  { useState, useEffect } from 'react'
import "../styles/Trip.css";
import { Card, Button, Carousel, Alert } from 'antd';
import { format } from "date-fns";
import tripAPI from "../apiservice/tripApi";
import { useNavigate, useParams } from "react-router-dom";





export function Trip () {

    const [title, setTitle] = useState ('')
    const [description, setDescription] = useState ('')
    const [startDate, setStartDate] = useState ('')
    const [endDate, setEndDate] = useState ('')
    const [users, setUsers] = useState ([])
    const [categories, setCategories] = useState ([])
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategory, setNewCategory] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate() 

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
            setLoading(true);
            const response = await tripAPI.getTripInfo(id);
            console.log ('esta es la respuesta', response)
            if (response.data) {

                setTitle (response.data.title )
                setDescription (response.data.description)
                setStartDate (formatDate(response.data.startDate) ) 
                setEndDate(formatDate(response.data.endDate)) 
                setUsers(response.data.users)
                setCategories(response.data.categories)
            } else if (response.error) {
            setError(response.error);
            }
        } catch (error) {
            setError(`Error fetching trip: ${error.message}`);
        } finally {
            setLoading(false);
        }
        }

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
                    setLoading(true);
                    const response = await tripAPI.addCategory(id, { title: newCategory });
                    console.log( 'esta es la respuesta', response);
                    setNewCategory(response.data);
                    getTripById(id);
                } catch (error) {
                    setError(`Error al crear la nueva categoría: ${error.message}`);
                } finally {
                    setLoading(false);
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
            {/*Aquí se refleja la información más relevante del viaje */ }
        <Card title= {title} extra={startDate + ' - ' + endDate} style={{ width: "100%" }}>
            <p>{description}</p>
            <p>Integrantes del grupo: {users.map(user => user.username).join(', ')}</p>
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
            {error && (
            <Alert
                type="error"
                message={error}
                closable
                onClose={() => setError("")}
            />
        )}
    </Card>

        {/*Aquí se reflejan las categorías del viaje */ }
    <Carousel  afterChange={onChange} >

    {categories.map((category, index) => (
        <div key={index}>
            <h3 className='categoryStyle'>{category.title}</h3>
        </div>
    ))}
    </Carousel>

        </div>
    )
}