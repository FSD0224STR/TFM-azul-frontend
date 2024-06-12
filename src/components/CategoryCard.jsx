import { useState } from "react";
import { Card, Typography, Input } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import "../styles/CategoryCard.css";

function onEdit() {

}

export const CategoryCard = ({ title }) => {

  const [updatingCategory, setUpdatingCategory] = useState(false);

  return (
    <Card className="categoryCardSize">
      <div className="categoryPanel">

        {updatingCategory ? (
          <Input placeholder= {title} variant="borderless" className="titleInput" />
        ): (
          <Typography.Title level={4} className="cardTitle">
          {title}
        </Typography.Title>
        )}
        <div className="">
          <DeleteOutlined
            //   onClick={onDelete}
            className="icon-size danger-color"
          />
          <EditOutlined
            onClick={onEdit}
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
