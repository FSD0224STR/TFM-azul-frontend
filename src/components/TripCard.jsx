import { Card, Descriptions, Tooltip } from "antd";
import {
  AlignRightOutlined,
  CalendarOutlined,
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
      label: <CalendarOutlined />,
      children: `del ${formatDate(startDate)} al ${formatDate(endDate)}`,
    },
    // {
    //   label: <ArrowLeftOutlined />,
    //   children: formatDate(endDate),
    // },
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
      title={<div className="centered-uppercase-blue">{title}</div>}
      className="cardSize"
      extra={
        <>
          <div className="btnPanel">
            <Tooltip title="Borrar">
              <DeleteOutlined
                onClick={onDelete}
                className="icon-size danger-color "
              />
            </Tooltip>
            <Tooltip title="Editar">
              <EditOutlined
                onClick={onEdit}
                className="icon-size icon-margin-left "
              />
            </Tooltip>
            <Tooltip title="Ver más">
              <EyeOutlined
                onClick={onView}
                className="icon-size icon-margin-left blue eye"
              />
            </Tooltip>
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
