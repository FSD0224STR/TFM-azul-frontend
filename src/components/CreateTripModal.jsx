import { useState, useEffect } from "react";
import { Button, Modal, Form, Input, DatePicker } from "antd";
import moment from "moment";
import TripApi from "../apiservice/tripApi";

const CreateTripModal = ({ visible, onCancel, editingTrip, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (editingTrip) {
        form.setFieldsValue({
          title: editingTrip.title,
          startDate: moment(editingTrip.startDate),
          endDate: moment(editingTrip.endDate),
          description: editingTrip.description,
        });
      } else {
        form.resetFields(); // Resetear el formulario cuando se crea un nuevo viaje
      }
    }
  }, [visible, editingTrip, form]);

  const onFinish = async (tripData) => {
    setLoading(true);
    try {
      let response;
      if (editingTrip) {
        response = await TripApi.updateTrip(editingTrip._id, tripData);
      } else {
        response = await TripApi.addTrip(tripData);
      }

      if (response.error) {
        console.error("Error:", response.error);
        setError(response.error);
      } else if (response.data) {
        form.resetFields(); // Resetear el formulario después de guardar
        if (onUpdate) {
          onUpdate();
        }
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      setError(
        `Error ${editingTrip ? "updating" : "adding"} trip: ${error.message}`
      );
    } finally {
      setLoading(false);
      onCancel(); // Cierra el modal después de guardar o cancelar
    }
  };

  return (
    <Modal
      title={editingTrip ? "Editar Viaje" : "Crear Nuevo Viaje"}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => form.submit()}
        >
          {editingTrip ? "Guardar Cambios" : "Crear"}
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
  );
};

export default CreateTripModal;
