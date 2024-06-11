import { Card, Typography } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import "../styles/CategoryCard.css";

export const CategoryCard = ({ title }) => {
  return (
    <Card className="categoryCardSize">
      <div className="categoryPanel">
        <Typography.Title level={4} className="cardTitle">
          {title}
        </Typography.Title>
        <div className="">
          <DeleteOutlined
            //   onClick={onDelete}
            className="icon-size danger-color"
          />
          <EditOutlined
            //onClick={onEdit}
            className="icon-size icon-margin-left"
          />
          <FileSearchOutlined
            //onClick={onView}
            className="icon-size icon-margin-left"
          />
        </div>
      </div>
    </Card>
  );
};
