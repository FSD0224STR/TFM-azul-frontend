import { useState } from "react";
import { Button, Modal, Form, Input, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import TripApi from "../apiservice/tripApi"; // Importa tu API para manejar los viajes

const CreateTripModal = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
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
        navigate("/home");
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      setError(`Error ${id ? "updating" : "adding"} trip: ${error.message}`);
    } finally {
      setLoading(false);
      setVisible(false); // Cerrar el modal después de enviar el formulario
    }
  };

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20 }}>
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