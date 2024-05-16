import { Button, Card, Typography } from "antd";
import "../styles/TripCard.css";

export const TripCard = ({
  title,
  startDate,
  endDate,
  description,
  owner,
  onDelete,
}) => {
  return (
    <Card className="cardSize">
      <div className="cardBody">
        <Typography.Title level={3}>{`Título: ${title}`}</Typography.Title>
        <Typography variant="body2">{`Inicio del viaje: ${startDate}`}</Typography>
        <Typography variant="body2">{`Fin del viaje: ${endDate}`}</Typography>
        <Typography variant="body2">{`descripción: ${description}`}</Typography>
        <Typography variant="body2">{`Propietario: ${owner}`}</Typography>
        <Button onClick={onDelete}>Borrar</Button>
      </div>
    </Card>
  );
};
