import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import categoryApi from "../apiservice/categoryApi";
import { Card, Typography } from "antd";

const ViewCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    categoryApi
      .getCategoryInfo(id)
      .then((res) => {
        if (res.error) {
          setError(res.error);
        } else {
          setCategory(res.data);
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card className="categoryDetailSize">
      <Typography.Title level={2}>{category.title}</Typography.Title>
      <Typography.Paragraph>{category.description}</Typography.Paragraph>
      {/* Aquí puedes agregar más detalles de la categoría */}
    </Card>
  );
};

export default ViewCategory;
