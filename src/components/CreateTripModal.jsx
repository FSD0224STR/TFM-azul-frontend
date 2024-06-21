import { useState } from "react";
import { Button, Modal, Form, Input, DatePicker, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import TripApi from "../apiservice/tripApi"; // Importa tu API para manejar los viajes

const CreateTripModal = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { id } = useParams();
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = async (tripData) => {
    setLoading(true);
    try {
      let response;
      if (id) {
        response = await TripApi.updateTrip(id, tripData);
      } else {
        response = await TripApi.addTrip(tripData);
      }

      if (response.error) {
        console.error("Error:", response.error);
        setError(response.error);
      } else if (response.data) {
        // Limpiar campos del formulario y cerrar modal
        form.resetFields();
        setVisible(false);

        // Actualizar la página para mostrar el viaje agregado
        window.location.reload(); // Otra opción es navegar a la página de inicio
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      setError(`Error ${id ? "updating" : "adding"} trip: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20 }}>
      <Tooltip title="Crear Nuevo Viaje">
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<PlusOutlined />}
          onClick={showModal}
          style={{
            width: "64px",
            height: "64px",
            lineHeight: "64px",
            textAlign: "center",
          }}
        />
      </Tooltip>
      <Modal
        title="Crear Nuevo Viaje"
        open={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => form.submit()}
          >
            Crear
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ startDate: null, endDate: null }}
        >
          <Form.Item
            label="Título del Viaje"
            name="title"
            rules={[
              {
                required: true,
                message: "Por favor ingresa el título del viaje",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Fecha de Ida"
            name="startDate"
            rules={[
              { required: true, message: "Por favor ingresa la fecha de ida" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Fecha de Vuelta"
            name="endDate"
            rules={[
              {
                required: true,
                message: "Por favor ingresa la fecha de vuelta",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Descripción"
            name="description"
            rules={[
              { required: true, message: "Por favor ingresa la descripción" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateTripModal;
