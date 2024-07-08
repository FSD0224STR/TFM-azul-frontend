import { Card, Descriptions, message, Popconfirm, Typography } from "antd";
import {
  AlignRightOutlined,
  DeleteOutlined,
  DislikeOutlined,
  EditOutlined,
  EnvironmentOutlined,
  LikeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "../styles/ProposalCard.css";

export const ProposalCard = ({
  title,
  address,
  description,
  owner,
  like,
  dislike,
  onEdit,
  onDelete,
  addLike,
  addDislike,
}) => {
  const items = [
    {
      label: <EnvironmentOutlined />,
      children: address,
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

  const confirm = (e) => {
    console.log(e);
    message.success("Un viaje menos, una depresión más");
    onDelete();
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Una retirada a tiempo es una victoria");
  };

  return (
    <Card
      title={title}
      className="cardSize"
      extra={
        <>
          <div className="btnPanel">
            <Popconfirm
              title="Borrar el viaje"
              description="¿Estás seguro que quieres borrar esta propuesta?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Sí"
              cancelText="No"
            >
              <DeleteOutlined className="icon-size danger-color " />
            </Popconfirm>
            <EditOutlined
              onClick={onEdit}
              className="icon-size icon-margin-left"
            />
            <div className="number-panel icon-margin-left">
              <Typography.Title level={4}>{like}</Typography.Title>
              <LikeOutlined onClick={addLike} className="icon-size blue" />
            </div>
            <div className="number-panel icon-margin-left">
              <Typography.Title level={4}>{dislike}</Typography.Title>
              <DislikeOutlined
                onClick={addDislike}
                className="icon-size blue"
              />
            </div>
          </div>
        </>
      }
    >
      <div className="cardBody">
        <Descriptions
          column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
          items={items}
        />
      </div>
    </Card>
  );
};
