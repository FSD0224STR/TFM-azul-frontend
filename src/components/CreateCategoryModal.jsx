import { useState } from "react";
import tripApi from "../apiservice/tripApi";
import { Button, Input, Modal, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const AddCategoryModal = ({ tripId, getTripById }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState("");

  const handleAddCategoryClick = async () => {
    try {
      const response = await tripApi.addCategory(tripId, {
        title: newCategory,
      });
      console.log("Respuesta:", response);
      setNewCategory(""); // Limpiar el campo de entrada después de añadir la categoría

      if (response.data) {
        // Verificar que getTripById sea una función antes de llamarla
        if (typeof getTripById === "function") {
          getTripById(tripId); // Actualizar el estado del viaje para reflejar la nueva categoría
        }
        setModalVisible(false); // Cerrar el modal después de añadir la categoría exitosamente
      } else {
        setError("No se pudo añadir la categoría correctamente.");
      }
    } catch (error) {
      setError(`Error al crear la nueva categoría: ${error.message}`);
    }
  };

  return (
    <>
      <Tooltip title="Añadir categoría">
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<PlusOutlined />}
          onClick={() => setModalVisible(true)}
          style={{
            width: "64px",
            height: "64px",
            lineHeight: "64px",
            textAlign: "center",
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1000,
          }}
        />
      </Tooltip>

      <Modal
        title="Añadir Categoría"
        open={modalVisible}
        onOk={handleAddCategoryClick}
        onCancel={() => {
          setModalVisible(false);
          setNewCategory(""); // Limpiar el campo de entrada si se cancela
        }}
      >
        <Input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nombre de la categoría"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Modal>
    </>
  );
};

export default AddCategoryModal;
