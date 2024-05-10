import { Button, Card, Typography } from "antd";

export const TripCard = ({ title, start_date, end_date, onDelete }) => {
  return (
    <Card sx={{ p: 1 }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2">{start_date}</Typography>
      <Typography variant="body2">{end_date}</Typography>
      <Button onClick={onDelete}>Borrar</Button>
    </Card>
  );
};
