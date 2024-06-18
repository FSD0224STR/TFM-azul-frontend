import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import categoryApi from "../apiservice/categoryApi";
import { Alert, Button, Typography } from "antd";
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { ProposalCard } from "../components/ProposalCard";

export const ViewCategory = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [proposals, setProposals] = useState([]);
  const [isAddingProposal, setIsAddingProposal] = useState(false);
  const [newProposal, setNewProposal] = useState("");
  const [error, setError] = useState("");
  //   const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //llamada a la api para obtener los datos de esa categoría
  const getCategoryById = async (id) => {
    console.log("Este es el getCategoryById ", id);

    try {
      const response = await categoryApi.getCategoryInfo(id);
      console.log("esta es la respuesta", response);
      if (response.data) {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setProposals(response.data.proposals);
      } else if (response.error) {
        setError(response.error);
      }
    } catch (error) {
      setError(`Error fetching category: ${error.message}`);
    }
  };

  //Pintamos la categoría nada más arrancar la página
  useEffect(() => {
    getCategoryById(id);
  }, []);

  //Función para actualizar la categoría, que te redirige a la página de editar
  const updateCategory = (idToUpdate) => {
    navigate(`/updateCategory/${idToUpdate}`);
  };

  //Función para añadir una nueva propuesta a la categoría
  const handleAddProposalClick = async () => {
    if (isAddingProposal) {
      try {
        const response = await categoryApi.addProposal(id, {
          title: newProposal,
        });
        console.log("esta es la respuesta", response);
        setNewProposal(response.data);
        getCategoryById(id);
      } catch (error) {
        setError(`Error al crear la nueva propuesta: ${error.message}`);
      }
      console.log("Añadiendo la propuesta -----", newProposal);
    }
    setIsAddingProposal(!isAddingProposal);
    setNewProposal("");
  };

  return (
    <div>
      {/*Aquí se refleja la información más relevante de la categoría */}
      <div className="cardInfoTrip">
        <div className="travelTitle">
          <Typography.Title level={1}>{title}</Typography.Title>
        </div>
        <p className="description">{description}</p>
        <Button
          className="tripButton"
          onClick={() => updateCategory(id)}
          icon={<EditOutlined />}
        >
          Editar
        </Button>

        <Button
          className="tripButton"
          onClick={handleAddProposalClick}
          icon={<PlusCircleOutlined />}
        >
          Añadir propuesta
        </Button>

        {isAddingProposal && (
          <input
            className="newCategoryInput"
            value={newProposal}
            onChange={(e) => setNewProposal(e.target.value)}
            placeholder="Nombre de la propuesta"
          />
        )}
        {/*Este error no se si funciona */}
        {error && (
          <Alert
            type="error"
            message={error}
            closable
            onClose={() => setError("")}
          />
        )}

        {/* */}
      </div>

      {/*Aquí se reflejan las propuestas del viaje */}

      <div className="categoryCardList">
        {proposals.map((proposal) => (
          <ProposalCard
            key={proposal._id}
            id={proposal._id}
            title={proposal.title}
            description={proposal.description}
            address={proposal.address}
            owner={proposal.owner}
            refreshProposals={() => getCategoryById(id)} // Pasar la función de actualización como prop
          ></ProposalCard>
        ))}
      </div>
    </div>
  );
};
