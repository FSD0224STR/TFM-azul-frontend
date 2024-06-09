import { Card, Descriptions } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
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
  onView,
}) => {
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
    <Card
      title={title}
      className="cardSize"
      extra={
        <>
          <div className="btnPanel">
            <DeleteOutlined
              onClick={onDelete}
              className="icon-size danger-color"
            />
            <EditOutlined
              onClick={onEdit}
              className="icon-size icon-margin-left"
            />
            <FileSearchOutlined
              onClick={onView}
              className="icon-size icon-margin-left"
            />
          </div>
        </>
      }
    >
      <div className="cardBody">
        <Descriptions
          bordered
          column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
          items={items}
        />
        {/* <div className="btnMarging btnPanel">
          <Button onClick={onDelete} danger>
            Borrar
          </Button>
          <Button onClick={onEdit}>Editar</Button>
          <Button onClick={onView}>Ver más</Button>
        </div> */}
      </div>
    </Card>
  );
};
