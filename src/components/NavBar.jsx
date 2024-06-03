import { Layout, Menu, Button, Typography } from "antd";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import "../styles/NavBar.css";

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
              <Title level={5}  className="navBar-title">
                TFM GRUPO AZUL
              </Title>
            ),
          },
          {
            key: "2",
            label: isLoggedIn && (
              <Link to="/home"  className={isLoggedIn ? '' : 'hidden-and-disabled'}>
                <Button type="link">
                  Home
                </Button>
              </Link>
              ),
          },
          {
            key: "3",
            label: (
              !isLoggedIn ? (
                <Link to="/login">
                  <Button type="link">
                    Login
                  </Button>
                </Link>
              ) : (
                <Button type="link" onClick={logout}>
                  Logout
                </Button>
              )
            ),
          },
        ]}
      />
    </Header>
  );
};
export { NavBar };
