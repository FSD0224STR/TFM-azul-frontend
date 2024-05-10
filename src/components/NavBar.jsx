import { Layout, Menu, Button, Typography } from "antd";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

const { Header } = Layout;
const { Title } = Typography;

const NavBar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        items={[
          {
            key: "1",
            label: (
              <Title level={5} style={{ color: "white" }}>
                TFM GRUPO AZUL
              </Title>
            ),
          },
          {
            key: "2",
            label: (
              <Link to="/home">
                <Button type="link" style={{ color: "white" }}>
                  Home
                </Button>
              </Link>
            ),
          },
          {
            key: "4",
            label: !isLoggedIn && (
              <Link to="/login">
                <Button type="link" style={{ color: "white" }}>
                  Login
                </Button>
              </Link>
            ),
          },
          {
            key: "5",
            label: isLoggedIn && (
              <Button type="link" onClick={logout} style={{ color: "white" }}>
                Logout
              </Button>
            ),
          },
        ]}
      />
    </Header>
  );
};
export { NavBar };
