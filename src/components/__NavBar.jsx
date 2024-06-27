import { Layout, Menu, Button, Typography, Tooltip } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import "../styles/NavBar.css";
import {
  ArrowLeftOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;

const NavBar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        items={[
          {
            key: "0",
            label: (
              <Tooltip title="Regresar">
                <Button type="link" onClick={handleGoBack}>
                  <ArrowLeftOutlined className="icon-size" />
                </Button>
              </Tooltip>
            ),
          },
          {
            key: "1",
            label: (
              <Title level={5} className="navBar-title">
                TFM GRUPO AZUL
              </Title>
            ),
          },
          {
            key: "2",
            label: isLoggedIn && (
              <Link
                to="/home"
                className={isLoggedIn ? "" : "hidden-and-disabled"}
              >
                <Button type="link">
                  <HomeOutlined className="icon-size" />
                </Button>
              </Link>
            ),
          },
          {
            key: "3",
            label: isLoggedIn && (
              <Link
                to="/user"
                className={isLoggedIn ? "" : "hidden-and-disabled"}
              >
                <Button type="link">
                  <UserOutlined className="icon-size" />
                </Button>
              </Link>
            ),
          },
          {
            key: "4",
            label: !isLoggedIn ? (
              <Link to="/login">
                <Button type="link">
                  <LoginOutlined className="icon-size" />
                </Button>
              </Link>
            ) : (
              <Tooltip title="Cerrar sesión">
                <Button type="link" onClick={logout}>
                  <LogoutOutlined className="icon-size" />
                </Button>
              </Tooltip>
            ),
          },
        ]}
      />
    </Header>
  );
};
export { NavBar };
