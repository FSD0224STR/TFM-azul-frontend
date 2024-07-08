import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import tripAPI from "../apiservice/tripApi";
import logo from "../images/logo.png";
import { Breadcrumb, Layout, Menu, Button, Spin, Alert, theme } from "antd";
import LoginModal from "./LoginModal";

const { Header, Content, Footer, Sider } = Layout;

const MyLayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { isLoggedIn, logout, loading, error, setError } =
    useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await tripAPI.getAllTrips();
        setTrips(response.data);
      } catch (error) {
        setError(`Error fetching trips: ${error.message}`);
      }
    };

    fetchTrips();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setError("");
  };

  const handleLoginSuccess = (returnUrl) => {
    console.log(returnUrl);
  };

  const handleMenuClick = (e) => {
    if (e.key === "logout") {
      logout();
    }
  };

  const menuItems = trips.map((trip) => ({
    key: `sub${trip._id}`,
    label: trip.title,
    children: [
      { key: `option1-${trip._id}`, label: "Option 1" },
      { key: `option2-${trip._id}`, label: "Option 2" },
      { key: `option3-${trip._id}`, label: "Option 3" },
      { key: `option4-${trip._id}`, label: "Option 4" },
    ],
  }));

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <Link to="/">
            <img
              className="logo"
              src={logo}
              alt="Logo de la Aplicación"
              style={{
                height: "50px",
                verticalAlign: "-webkit-baseline-middle",
              }}
            />
          </Link>
        </div>
        {isLoggedIn ? (
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["home"]}
            onClick={handleMenuClick}
          >
            <Menu.Item key="home">
              <Link to="/home">Home</Link>
            </Menu.Item>
            <Menu.Item key="perfil">
              <Link to="/perfil">Perfil</Link>
            </Menu.Item>
            <Menu.Item key="FAQs">
              <Link to="/FAQs">FAQs</Link>
            </Menu.Item>
            <Menu.Item key="logout">Cerrar Sesión</Menu.Item>
          </Menu>
        ) : (
          <div
            className="auth-container"
            style={{ flex: 4, textAlign: "right" }}
          >
            <Button className="login-btn" type="primary" onClick={showModal}>
              {loading ? <Spin /> : "Iniciar sesión"}
            </Button>
            <LoginModal
              isModalVisible={isModalVisible}
              handleCancel={handleCancel}
              handleLoginSuccess={handleLoginSuccess}
            />
            {error && (
              <div className="error-container">
                <Alert
                  type="error"
                  message={error}
                  closable
                  onClose={() => setError("")}
                />
              </div>
            )}
          </div>
        )}
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {isLoggedIn && (
            <Sider style={{ background: colorBgContainer }} width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
              >
                {menuItems.map((item) => (
                  <Menu.SubMenu
                    key={item.key}
                    icon={item.icon}
                    title={item.label}
                  >
                    {item.children.map((child) => (
                      <Menu.Item key={child.key}>{child.label}</Menu.Item>
                    ))}
                  </Menu.SubMenu>
                ))}
              </Menu>
            </Sider>
          )}
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            {children}
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default MyLayout;
