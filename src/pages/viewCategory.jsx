import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import categoryApi from "../apiservice/categoryApi";
import proposalApi from "../apiservice/proposalApi";
import {
  Alert,
  Button,
  Typography,
  Modal,
  Form,
  Input,
  Tooltip,
  Breadcrumb,
} from "antd";
import { PlusOutlined, HomeOutlined } from "@ant-design/icons";
import { ProposalCard } from "../components/ProposalCard";
import { AuthContext } from "/src/contexts/authContext";

const { TextArea } = Input;

export const ViewCategory = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  //const [description, setDescription] = useState("");
  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState("");
  const [visibleModal, setVisibleModal] = useState(false);
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProposal, setCurrentProposal] = useState(null);

  const authContext = useContext(AuthContext);
  const { profile } = authContext;
  const [userId, setUserId] = useState(null);
  const [tripId, setTripId] = useState(null);
  const [tripName, setTripName] = useState(null);

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
        //console.log("response.data", response.data);
        setTitle(response.data.title);
        //setDescription(response.data.description);
        setProposals(response.data.proposals);
        setTripId(response.data.tripId);
        setTripName(response.data.tripName);
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
    if (profile) {
      console.log("profile userid: ", profile._id);
      setUserId(profile._id);
    }
  }, [profile]);

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

  const handleAddLikeAndSync = async (proposalId) => {
    await proposalApi.addLike(proposalId);
    getCategoryById(id);
  };

  const handleAddDislikeAndSync = async (proposalId) => {
    await proposalApi.addDislike(proposalId);
    getCategoryById(id);
  };

  const handleRemoveLikeAndSync = async (proposalId) => {
    await proposalApi.removeLike(proposalId);
    getCategoryById(id);
  };

  const handleRemoveDislikeAndSync = async (proposalId) => {
    await proposalApi.removeDislike(proposalId);
    getCategoryById(id);
  };

  return (
    <div>
      <div className="breadcrumbContainer">
        <Breadcrumb
          items={[
            {
              href: "../home",
              title: <HomeOutlined />,
            },
            {
              href: `../trip/${tripId}`,
              title: `${tripName}`,
            },
            {
              //href: `${id}`,
              title: `${title}`,
            },
          ]}
        />
      </div>
      <div className="cardInfoTrip">
        <div className="travelTitle">
          <Typography.Title level={1}>{title}</Typography.Title>
        </div>
        {/* <p className="description">{description}</p> */}

        <Tooltip title="Añadir propuesta">
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => handleAddProposalClick(true)}
            style={{
              width: "64px",
              height: "64px",
              lineHeight: "64px",
              textAlign: "center",
              position: "fixed",
              bottom: 20,
              right: 20,
            }}
          />
        </Tooltip>

        <Modal
          title={isEditing ? "Editar Propuesta" : "Añadir Propuesta"}
          open={visibleModal}
          onCancel={handleModalClose}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
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
              address={proposal.address}
              description={proposal.description}
              owner={proposal.owner}
              like={proposal.like}
              dislike={proposal.dislike}
              userId={userId}
              addLike={() => handleAddLikeAndSync(proposal._id)}
              addDislike={() => handleAddDislikeAndSync(proposal._id)}
              removeLike={() => handleRemoveLikeAndSync(proposal._id)}
              removeDislike={() => handleRemoveDislikeAndSync(proposal._id)}
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
