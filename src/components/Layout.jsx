import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, Button, Spin, Alert, theme } from "antd";
import logo from "../images/logo.png";
import LoginModal from "../components/LoginModal";
import tripAPI from "../apiservice/tripApi";
import { AuthContext } from "../contexts/authContext";

const { Header, Content, Footer, Sider } = Layout;

const MyLayout = ({ children }) => {
  const { token } = theme.useToken();
  const { colorBgContainer, borderRadiusLG } = token;

  const { isLoggedIn, logout, loading, error, setError } =
    useContext(AuthContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [trips, setTrips] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);

  const navigate = useNavigate();

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
  }, [setError]);

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

  const handleSubMenuClick = ({ key }) => {
    setOpenKeys(key ? [key] : []);
  };

  const handleTripClick = (tripId) => {
    // Navegar a la página de detalles del trip
    navigate(`/${tripId}`);
  };

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
              <Link to="/home">Viajes</Link>
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
                defaultOpenKeys={openKeys}
                onOpenChange={handleSubMenuClick}
                style={{ height: "100%" }}
              >
                <Menu.Item>Añadir viaje</Menu.Item>
                {trips.map((trip) => (
                  <Menu.SubMenu key={trip._id} title={trip.title}>
                    <Menu.Item
                      key={`details-${trip._id}`}
                      onClick={() => handleTripClick(trip._id)}
                    >
                      Información
                    </Menu.Item>
                    <Menu.SubMenu title="Categorías">
                      {trip.categories.map((category) => (
                        <Menu.Item key={category._id}>
                          <Link to={`/categories/${category._id}`}>
                            {category.title}
                          </Link>
                        </Menu.Item>
                      ))}
                      <Menu.Item>Añadir categoría</Menu.Item>
                    </Menu.SubMenu>
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
        Equipo Azul ©{new Date().getFullYear()} Created by A.B.A.S.
      </Footer>
    </Layout>
  );
};

export default MyLayout;
