import { useState } from "react";
import { Card, Typography, Input, Modal, message, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons";
import "../styles/CategoryCard.css";
import categoryApi from "../apiservice/categoryApi";
import { useNavigate } from "react-router-dom";

export const CategoryCard = ({ id, title, refreshCategories }) => {
  const [updatingCategory, setUpdatingCategory] = useState(false);
  const [error, setError] = useState("");
  const [newTitle, setNewTitle] = useState(title);
  const [loading, setLoading] = useState(false);
  const [editIcon, setEditIcon] = useState(<EditOutlined />);
  const navigate = useNavigate();

  const showErrorModal = (message) => {
    Modal.error({
      title: "Error",
      content: message,
    });
  };

  const onEdit = async (e) => {
    e.stopPropagation();
    if (updatingCategory) {
      try {
        setLoading(true);
        const response = await categoryApi.updateCategory(id, {
          title: newTitle,
        });
        if (response.error) {
          setError(response.error);
          console.log(response.error);
          showErrorModal(response.error);
        } else {
          console.log(
            "Respuesta de actualizar la categoría:",
            response.message
          );
          setUpdatingCategory(false);
          refreshCategories();
        }
      } catch (error) {
        setError(error.message);
        console.log(error.message);
        showErrorModal(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setUpdatingCategory(true);
    }
  };

  const onDelete = async () => {
    setLoading(true);
    try {
      const response = await categoryApi.deleteCategory(id);
      console.log("Respuesta de borrar la categoría:", response);
      if (response.error) {
        setError(response.error);
        console.log(response.error);
        showErrorModal(response.error);
      } else {
        message.success("Categoría eliminada");
        refreshCategories();
      }
    } catch (error) {
      setError(error.message);
      showErrorModal(error.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (e) => {
    e.stopPropagation(); // Detener la propagación del evento hacia arriba
    onDelete();
  };

  const cancelDelete = (e) => {
    e.stopPropagation(); // Detener la propagación del evento hacia arriba
    message.info("Operación cancelada");
  };

  const onView = (e) => {
    e.stopPropagation(); // Detener la propagación del evento hacia arriba
    navigate(`/categories/${id}`);
  };

  const toggleEdit = (e) => {
    e.stopPropagation();
    if (updatingCategory) {
      onEdit(e);
    } else {
      setUpdatingCategory(true);
      setEditIcon(<CheckOutlined />);
    }
  };

  return (
    <Card
      className="cardSize categoryCard"
      style={{ margin: "25px", width: "20%" }}
    >
      <div className="categoryPanel" onClick={onView}>
        <div className="categoryTitle">
          {updatingCategory ? (
            <Input
              value={newTitle}
              placeholder={title}
              onChange={(e) => setNewTitle(e.target.value)}
              className="titleInput"
              onClick={(e) => e.stopPropagation()} // Evitar que el clic se propague hacia arriba
            />
          ) : (
            <Typography.Title level={4} className="cardTitle">
              {title}
            </Typography.Title>
          )}
        </div>
        <div className="btns">
          <Popconfirm
            title="¿Estás seguro que quieres borrar este viaje?"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
            okText="Sí"
            cancelText="No"
          >
            <DeleteOutlined
              className="icon-size danger-color"
              onClick={(e) => e.stopPropagation()}
            />
          </Popconfirm>

          {updatingCategory ? (
            <span className="icon-size icon-margin-left" onClick={toggleEdit}>
              {editIcon}
            </span>
          ) : (
            <EditOutlined
              className="icon-size icon-margin-left"
              onClick={toggleEdit}
            />
          )}
        </div>
      </div>
    </Card>
  );
};
