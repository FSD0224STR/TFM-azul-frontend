import { Button, Card, Typography } from "antd";
import '../styles/TripCard.css';

export const TripCard = ({ title, start_date, end_date, user, onDelete }) => {
  return (
    <Card className="cardSize">
      <div className="cardBody">
        <Typography.Title
                level={3}>{title}</Typography.Title>
        <Typography variant="body2">{start_date}</Typography>
        <Typography variant="body2">{end_date}</Typography>
        <Typography variant="body2">{user}</Typography>
        <Button onClick={onDelete}>Borrar</Button>
      </div>
    </Card>
  );
};
