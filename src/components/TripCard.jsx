import { Card, Descriptions } from "antd";
import {
  AlignRightOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UserOutlined,
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
      label: <ArrowRightOutlined />,
      children: formatDate(startDate),
    },
    {
      label: <ArrowLeftOutlined />,
      children: formatDate(endDate),
    },
    {
      label: <AlignRightOutlined />,
      children: description,
    },
    {
      label: <UserOutlined />,
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
            <EyeOutlined
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
