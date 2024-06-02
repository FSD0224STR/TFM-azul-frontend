import { Form, Input, Button, Alert, Spin } from "antd";
import { useState, useEffect, useCallback } from "react";
import tripAPI from "../apiservice/tripApi";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";

export const TripInfo = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { id } = useParams();

  const onFinish = async (tripData) => {
    setLoading(true);
    //const { title, startDate, endDate, description } = tripData;
    //console.log(tripData);
    try {
      let response;
      if (id) {
        response = await tripAPI.updateTrip(id, tripData);
      } else {
        response = await tripAPI.addTrip(tripData);
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
    }
  };

  const formatDate = (date) => {
    return date ? format(new Date(date), "yyyy-MM-dd") : "";
  };

  const getTripById = useCallback(
    async (id) => {
      console.log("Este es el getTripById ", id);
      try {
        setLoading(true);
        const response = await tripAPI.getTripInfo(id);
        if (response.data) {
          form.setFieldsValue({
            title: response.data.title,
            startDate: formatDate(response.data.startDate),
            endDate: formatDate(response.data.endDate),
            description: response.data.description,
          });
        } else if (response.error) {
          setError(response.error);
        }
      } catch (error) {
        setError(`Error fetching trip: ${error.message}`);
      } finally {
        setLoading(false);
      }
    },
    [form]
  );

  useEffect(() => {
    if (id) {
      getTripById(id);
    }
  }, [id, getTripById]);

  return (
    <div>
      <Form form={form} name="addtrip" onFinish={onFinish} layout="vertical">
        <Form.Item
          name="title"
          label="Nombre del viaje"
          rules={[
            {
              required: true,
              message: "Por favor ingresa el nombre del viaje",
            },
          ]}
        >
          <Input placeholder="Nombre del viaje" />
        </Form.Item>

        {/* Aquí puedes agregar más campos según sea necesario */}
        <Form.Item name="startDate" label="Fecha de comienzo del viaje">
          <Input placeholder="Fecha de comienzo del viaje" type="date" />
        </Form.Item>

        <Form.Item name="endDate" label="Fecha de finalización del viaje">
          <Input placeholder="Fecha de finalización del viaje" type="date" />
        </Form.Item>

        <Form.Item name="description" label="Descripción">
          <Input placeholder="Haz una breve descripción del viaje" />
        </Form.Item>

        {loading ? (
          <Spin />
        ) : (
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Guardar
            </Button>
          </Form.Item>
        )}
        {error && (
          <Alert
            type="error"
            message={error}
            closable
            onClose={() => setError("")}
          />
        )}
      </Form>
    </div>
  );
};
