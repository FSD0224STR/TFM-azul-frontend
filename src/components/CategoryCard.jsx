import { useState  } from "react";
import { Card, Typography, Input } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import "../styles/CategoryCard.css";
import categoryApi from "../apiservice/categoryApi";



export const CategoryCard = ({ id, title }) => {

  const [updatingCategory, setUpdatingCategory] = useState(false);
  const [error, setError] = useState("");
  const [newTitle, setNewTitle] = useState(title);

  const onEdit = async () => {
    if (updatingCategory) {
      try {
        const response = await categoryApi.updateCategory(id, {title: newTitle});
        console.log("Esta es la respuesta de actualizar la categoría:", response.message);
        setUpdatingCategory(!updatingCategory); // Mover esta línea aquí
        
      } catch (error) {
        setError(error.message);
        console.log(error.message);
      }
    } else {
      setUpdatingCategory(!updatingCategory);
    }
  };
  

  return (
    <Card className="categoryCardSize">
      <div className="categoryPanel">

        {updatingCategory ? (
          <Input value = {newTitle} placeholder= {title} onChange={(e) => setNewTitle(e.target.value)} variant="borderless" className="titleInput"  />
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
