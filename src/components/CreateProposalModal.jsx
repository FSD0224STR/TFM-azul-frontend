import { Modal, Form, Input, Button } from "antd";

const { TextArea } = Input;

const ProposalModal = ({ visible, onCancel, onFinish, isEditing, form }) => {
  return (
    <Modal
      title={isEditing ? "Editar Propuesta" : "Añadir Propuesta"}
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="title"
          label="Título"
          rules={[
            {
              required: true,
              message: "Por favor ingresa el título de la propuesta",
            },
          ]}
        >
          <Input placeholder="Título de la propuesta" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Descripción"
          rules={[
            {
              required: true,
              message: "Por favor ingresa la descripción de la propuesta",
            },
          ]}
        >
          <TextArea rows={4} placeholder="Descripción de la propuesta" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Dirección"
          rules={[
            {
              required: true,
              message: "Por favor ingresa la dirección de la propuesta",
            },
          ]}
        >
          <Input placeholder="Dirección de la propuesta" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isEditing ? "Guardar" : "Añadir"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProposalModal;
