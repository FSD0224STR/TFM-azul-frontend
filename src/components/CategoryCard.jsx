import { useState } from "react";
import { Card, Typography, Input, Modal, message, Popconfirm } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  // FileSearchOutlined,
} from "@ant-design/icons";
import "../styles/CategoryCard.css";
import categoryApi from "../apiservice/categoryApi";
import { useNavigate } from "react-router-dom";

export const CategoryCard = ({ id, title, refreshCategories }) => {
  const [updatingCategory, setUpdatingCategory] = useState(false);
  const [error, setError] = useState("");
  const [newTitle, setNewTitle] = useState(title);
  const [loading, setLoading] = useState(false);
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
            "Esta es la respuesta de actualizar la categoría:",
            response.message
          );
          setUpdatingCategory(!updatingCategory); // Mover esta línea aquí
          refreshCategories();
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        console.log(error.message);
        showErrorModal(error.message);
      }
    } else {
      setUpdatingCategory(!updatingCategory);
    }
  };

  const onDelete = async (e) => {
    e.stopPropagation();
    setLoading(true);
    try {
      const response = await categoryApi.deleteCategory(id);
      console.log("La respuesta de borrar es:", response);
      if (response.error) {
        setError(response.error);
        console.log(response.error);
        showErrorModal(response.error);
      } else {
        console.log(
          "Esta es la respuesta de eliminar la categoría:",
          response.message
        );
        refreshCategories();
      }
    } catch (error) {
      setError(error.message);
      showErrorModal(error.message);
    }
    setLoading(false);
  };

  const confirm = (e) => {
    console.log(e);
    message.success("Un viaje menos, una depresión más");
    onDelete();
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Una retirada a tiempo es una victoria");
  };
  const onView = () => {
    navigate(`/categories/${id}`);
  };

  return (
    <Card
      className="cardSize categoryCard"
      style={{ margin: "25px", width: "20%" }}
      onClick={onView}
    >
      <div className="categoryPanel">
        <div className="categoryTitle">
          {updatingCategory ? (
            <Input
              value={newTitle}
              placeholder={title}
              onChange={(e) => setNewTitle(e.target.value)}
              className="titleInput"
            />
          ) : (
            <Typography.Title level={4} className="cardTitle">
              {title}
            </Typography.Title>
          )}
        </div>
        <div className="btns">
          <Popconfirm
            title="Borrar el viaje"
            description="¿Estás seguro que quieres borrar este viaje?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Sí"
            cancelText="No"
          >
            <DeleteOutlined className="icon-size danger-color " />
          </Popconfirm>

          <EditOutlined
            onClick={onEdit}
            className="icon-size icon-margin-left"
          />
          {/* <FileSearchOutlined
            onClick={onView}
            className="icon-size icon-margin-left"
          /> */}
        </div>
      </div>
    </Card>
  );
};
