
import { Form, Input, Button, Alert, } from 'antd';
import {useState } from "react";
import tripAPI from "../apiservice/tripApi";
import { useNavigate } from 'react-router-dom';

export const AddTrip = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [form] = Form.useForm();
    const navigate = useNavigate ()

    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");


        const onFinish = async (title, startDate, endDate, description) => {
            setLoading(true);
            try {
                const response = await tripAPI.addTrip(
                    title,
                    startDate,
                    endDate,
                    description 
                );
                console.log("Este es el response", response);
                    if (response.error) {
                        console.log("Este es el error al crear el viaje", response.error);
                        setError(response.error);
                    } else if (response.data) {
                        navigate ('/home')
                    }
                
                } catch (error) {
                setError(`Error adding trip: ${error.message}`);
                } finally {
                setLoading(false);
                }
        }
    
return (
    <Form
    form={form}
    name="addtrip"
    onFinish={onFinish}
    layout="vertical"
    >
    <Form.Item
        name="title"
        label="Nombre del viaje"
        value = {title}
        rules={[{ required: true, message: 'Por favor ingresa el nombre del viaje' }]}
        onChange={(e) => setTitle(e.currentTarget.value)}
    >
        <Input placeholder="Nombre del viaje" />
    </Form.Item>

      {/* Aquí puedes agregar más campos según sea necesario */}
    <Form.Item
        name="startDate"
        label="Fecha de comienzo del viaje"
        value = {startDate}
        onChange={(e) => setStartDate(e.currentTarget.value)}
    >
        <Input placeholder="Fecha de comienzo del viaje" type='date' />
    </Form.Item>

    <Form.Item
        name="endDate"
        label="Fecha de finalización del viaje"
        value = {endDate}
        onChange={(e) => setEndDate(e.currentTarget.value)}
    >
        <Input placeholder="Fecha de finalización del viaje" type='date' />
    </Form.Item>

    <Form.Item
        name="description"
        label="Descripción"
        value = {description}
        onChange={(e) => setDescription(e.currentTarget.value)}
    >
        <Input placeholder=" Haz una breve descripción del viaje" />
    </Form.Item>

    <Form.Item>
        <Button type="primary" htmlType="submit" >
        Guardar
        </Button>
    </Form.Item>
    {error && (
            <Alert
                type="error"
                message={error}
                closable
                onClose={() => setError("")}
            />
        )}
    </Form>
);
};


