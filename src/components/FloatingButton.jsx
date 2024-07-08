import { Button, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const FloatingButton = ({ onClick, tooltipTitle = "Añadir" }) => (
  <Tooltip title={tooltipTitle}>
    <Button
      type="primary"
      shape="circle"
      size="large"
      icon={<PlusOutlined />}
      onClick={onClick}
      style={{
        textAlign: "center",
        position: "fixed",
        bottom: 25,
        right: "3%",
        color: "rgba(255, 255, 255)",
        zIndex: 100,
        transition: "transform 0.3s ease",
      }}
      className="floating-button"
    />
  </Tooltip>
);

export default FloatingButton;
