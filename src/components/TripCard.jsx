import { Card, Descriptions, Tooltip } from "antd";
import {
  AlignRightOutlined,
  CalendarOutlined,
  EditOutlined,
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

  onEdit,
  onView,
}) => {
  const formatDate = (date) => {
    return date ? format(new Date(date), "dd/MM/yyyy") : "";
  };

  const handleEdit = (e) => {
    e.stopPropagation(); // Detener la propagación del evento
    onEdit(); // Llamar a la función onEdit
  };

  const items = [
    {
      label: <CalendarOutlined />,
      children: `del ${formatDate(startDate)} al ${formatDate(endDate)}`,
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
      title={<div className="centered-uppercase">{title}</div>}
      className="cardSize"
      style={{ margin: "25px", width: "80%" }}
      extra={
        <>
          <div className="btnPanel">
            <Tooltip title="Editar">
              <EditOutlined
                onClick={handleEdit}
                className="icon-size icon-margin-left "
              />
            </Tooltip>
          </div>
        </>
      }
      onClick={onView}
    >
      <div className="cardBody">
        <Descriptions
          bordered
          column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
          items={items}
        />
      </div>
    </Card>
  );
};
