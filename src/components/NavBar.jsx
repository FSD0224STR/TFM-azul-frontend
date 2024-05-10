import { Layout, Menu, Avatar, Button, Typography } from "antd";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

const { Header } = Layout;
const { Title } = Typography;

const NavBar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <Header>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">
          <Title level={3} style={{ color: "white" }}>
            My App
          </Title>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/home">
            <Button type="link" style={{ color: "white" }}>
              Home
            </Button>
          </Link>
        </Menu.Item>

        {!isLoggedIn && (
          <Menu.Item key="4">
            <Link to="/login">
              <Button type="link" style={{ color: "white" }}>
                Login
              </Button>
            </Link>
          </Menu.Item>
        )}
        {isLoggedIn && (
          <Menu.Item key="5">
            <Button type="link" onClick={logout} style={{ color: "white" }}>
              Logout
            </Button>
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
};

export { NavBar };
