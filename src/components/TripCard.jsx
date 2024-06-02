import { Button, Card, Descriptions } from "antd";
import { format } from "date-fns";
import "../styles/TripCard.css";

export const TripCard = ({
  title,
  startDate,
  endDate,
  description,
  owner,
  onDelete,
  onEdit,
})  => {
  const formatDate = (date) => {
    return date ? format(new Date(date), "dd/MM/yyyy") : "";
  };

  const items = [
    {
      label: "Inicio del viaje",
      children: formatDate(startDate),
    },
    {
      label: "Fin del viaje",
      children: formatDate(endDate),
    },
    {
      label: "Descripción",
      children: description,
    },
    {
      label: "Propietario",
      children: owner,
    },
  ];

  return (
    <Card className="cardSize">
      <div className="cardBody">
        <Descriptions
          title={title}
          bordered
          column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
          items={items}
        />
        <div className="btnMarging btnPanel">
          <Button onClick={onDelete} danger >Borrar</Button>
          <Button onClick={onEdit} >Editar</Button>
          <Button >Ver más</Button>
       </div>
      </div>
    </Card>
  );
};