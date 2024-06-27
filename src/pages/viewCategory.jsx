import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import categoryApi from "../apiservice/categoryApi";
import proposalApi from "../apiservice/proposalApi";
import { Alert, Button, Typography, Modal, Form, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ProposalCard } from "../components/ProposalCard";

const { TextArea } = Input;

export const ViewCategory = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState("");
  const [visibleModal, setVisibleModal] = useState(false);
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProposal, setCurrentProposal] = useState(null);

  const showErrorModal = (message) => {
    Modal.error({
      title: "Error",
      content: message,
    });
  };

  const getCategoryById = async (id) => {
    try {
      const response = await categoryApi.getCategoryInfo(id);

      if (response.data) {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setProposals(response.data.proposals);
      } else if (response.error) {
        setError(response.error);
        showErrorModal(response.error);
      }
    } catch (error) {
      setError(`Error fetching category: ${error.message}`);
      showErrorModal(error.message);
    }
  };

  useEffect(() => {
    getCategoryById(id);
  }, [id]);

  const handleAddProposalClick = () => {
    setIsEditing(false);
    setVisibleModal(true);
  };

  const handleModalClose = () => {
    setVisibleModal(false);
    form.resetFields();
    setCurrentProposal(null);
  };

  const handleAddProposal = async (values) => {
    try {
      const response = await categoryApi.addProposal(id, {
        title: values.title,
        description: values.description,
        address: values.address,
      });

      if (response.error) {
        setError(response.error);
        console.log(response.error);
        showErrorModal(response.error);
      } else {
        console.log("Respuesta de añadir propuesta:", response);
        getCategoryById(id);
        handleModalClose();
      }
    } catch (error) {
      setError(`Error al crear la nueva propuesta: ${error.message}`);
    }
  };

  const handleEditProposal = async (values) => {
    try {
      const response = await proposalApi.updateProposal(currentProposal._id, {
        title: values.title,
        description: values.description,
        address: values.address,
      });
      console.log("Respuesta de editar propuesta:", response);
      if (response.error) {
        setError(response.error);
        console.log(response.error);
        showErrorModal(response.error);
      } else {
        getCategoryById(id);
        handleModalClose();
      }
    } catch (error) {
      setError(`Error al editar la propuesta: ${error.message}`);
      showErrorModal(error.message);
    }
  };

  const handleDeleteProposal = async (proposalId) => {
    try {
      const response = await proposalApi.deleteProposal(proposalId);
      console.log("Respuesta de eliminar propuesta:", response.data);
      getCategoryById(id);
      if (response.error) {
        setError(response.error);
        console.log(response.error);
        showErrorModal(response.error);
      }
    } catch (error) {
      setError(`Error al eliminar la propuesta: ${error.message}`);
      showErrorModal(error.message);
    }
  };

  const handleEditClick = (proposal) => {
    setIsEditing(true);
    setCurrentProposal(proposal);
    setVisibleModal(true);
    form.setFieldsValue({
      title: proposal.title,
      description: proposal.description,
      address: proposal.address,
    });
  };

  return (
    <div>
      <div className="cardInfoTrip">
        <div className="travelTitle">
          <Typography.Title level={1}>{title}</Typography.Title>
        </div>
        <p className="description">{description}</p>

        <Button
          className="tripButton"
          onClick={handleAddProposalClick}
          icon={<PlusCircleOutlined />}
        >
          Añadir propuesta
        </Button>

        <Modal
          title={isEditing ? "Editar Propuesta" : "Añadir Propuesta"}
          open={visibleModal}
          onCancel={handleModalClose}
          footer={null}
        >
          <Form
            form={form}
            onFinish={isEditing ? handleEditProposal : handleAddProposal}
          >
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

        {error && (
          <Alert
            type="error"
            message={error}
            closable
            onClose={() => setError("")}
          />
        )}

        <div className="categoryCardList">
          {proposals.map((proposal) => (
            <ProposalCard
              key={proposal._id}
              id={proposal._id}
              title={proposal.title}
              description={proposal.description}
              address={proposal.address}
              owner={proposal.owner}
              onEdit={() => handleEditClick(proposal)}
              onDelete={() => handleDeleteProposal(proposal._id)}
              refreshProposals={() => getCategoryById(id)}
            ></ProposalCard>
          ))}
        </div>
      </div>
    </div>
  );
};
