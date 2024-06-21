import { Card, Descriptions } from "antd";
import {
  DeleteOutlined,
  DislikeOutlined,
  EditOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import "../styles/ProposalCard.css";

export const ProposalCard = ({
  title,
  address,
  description,
  owner,
  onDelete,
  onEdit,
  like,
  dislike,
}) => {
  const items = [
    {
      label: "Dirección",
      children: address,
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
            <LikeOutlined
              onClick={like}
              className="icon-size icon-margin-left blue"
            />
            <DislikeOutlined
              onClick={dislike}
              className="icon-size icon-margin-left blue"
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
      </div>
    </Card>
  );
};
