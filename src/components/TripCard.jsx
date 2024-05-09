import { Button, Card, Typography } from "antd";

export const TripCard = ({ title, createdAt, onDelete }) => {
  return (
    <Card sx={{ p: 1 }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2">{createdAt}</Typography>
      <Button onClick={onDelete}>Borrar</Button>
    </Card>
  );
};
