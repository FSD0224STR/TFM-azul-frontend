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
        width: "80px",
        height: "80px",
        textAlign: "center",
        position: "fixed",
        bottom: 25,
        right: "3%",
        background: `rgba(0, 81, 255, 0.63)`,
        color: "rgba(255, 255, 255)",
        zIndex: 100,
        transition: "transform 0.3s ease",
      }}
      className="floating-button"
    />
  </Tooltip>
);

export default FloatingButton;
