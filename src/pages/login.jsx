import { LoginFooter } from "/src/components/LoginFooter";

import "../styles/Login.css";

const Login = () => {
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
      </p>
      <div>
        <LoginFooter />
      </div>
    </>
  );
};

export default Login;
