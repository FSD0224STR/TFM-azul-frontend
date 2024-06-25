// import { useContext, useState } from "react";
import { NavFooter } from "/src/components/NavFooter";
// import { Card, Typography, Spin, Row, Col, Input, Button, Alert } from "antd";
// import { AuthContext } from "../contexts/authContext";
import "../styles/Login.css";

const Login = () => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const { login, loading, error, setError } = useContext(AuthContext);

  return (
    <>
      <p className="texto">
        Nuestra aplicación de gestión de viajes entre amigos es el resultado del
        esfuerzo conjunto de Ana del Cerro, Álvaro Ogallar, Juan Sebastian y Bet
        Oliver durante su formación en el máster de FullStack Developer en
        Nuclio Digital School. Surgió para resolver el problema común de la
        dispersión de información y la falta de organización al planificar
        viajes en grupo. Inspirados por la frustración de tener que buscar y
        recuperar información perdida en múltiples chats de WhatsApp, creamos
        una plataforma que centraliza todas las propuestas de actividades para
        un viaje específico.
        <br />
        <br />
        Esta herramienta permite a los usuarios ver, ordenar, filtrar y votar
        las propuestas, facilitando la toma de decisiones colaborativa y
        organizada. Uno de los pilares de nuestra aplicación es su capacidad
        para promover la colaboración entre los viajeros. No solo ofrece la
        posibilidad de agregar nuevas propuestas y categorías de actividades,
        sino que también permite a todos los participantes unirse al viaje y
        contribuir con sus preferencias mediante votaciones. Esto no solo mejora
        la planificación del itinerario del viaje, sino que también fortalece el
        sentido de comunidad y participación de todos los involucrados. <br />
        <br />
        Mirando hacia el futuro, estamos comprometidos a mejorar continuamente
        nuestra aplicación. Planeamos incorporar nuevas funcionalidades basadas
        en los comentarios de los usuarios para asegurarnos de que nuestra
        plataforma siga siendo intuitiva, eficiente y adaptada a las necesidades
        cambiantes de la comunidad de viajeros. Nuestro objetivo es convertirnos
        en la herramienta preferida para la planificación de viajes entre
        amigos, ofreciendo una experiencia que simplifique y enriquezca cada
        aventura compartida.
        <NavFooter />
      </p>
    </>
    // /* xs={24} sm={12}  md={8} lg={6}  */
    // <>
    //   <div className="container">
    //     <div className="content">
    //       <Card className="loginCard">
    //         <Typography.Title level={2}>Bienvenido</Typography.Title>
    //         <Row gutter={[16, 16]} justify="center">
    //           <Col xs={24} className="inputRow">
    //             <Input
    //               placeholder="Usuario"
    //               value={username}
    //               onChange={(e) => setUsername(e.currentTarget.value)}
    //             />
    //           </Col>
    //           <Col xs={24} className="inputRow">
    //             <Input.Password
    //               placeholder="Password"
    //               value={password}
    //               onChange={(e) => setPassword(e.currentTarget.value)}
    //             />
    //           </Col>
    //         </Row>
    //         <div className="buttonContainer">
    //           {loading ? (
    //             <Spin />
    //           ) : (
    //             <Button
    //               type="primary"
    //               onClick={() => login(username, password)}
    //               block
    //             >
    //               Login
    //             </Button>
    //           )}
    //         </div>
    //       </Card>
    //       {error && (
    //         <Alert
    //           type="error"
    //           message={error}
    //           closable
    //           onClose={() => setError("")}
    //         />
    //       )}
    //       <NavFooter />
    //     </div>
    //   </div>
    // </>
  );
};

export default Login;
