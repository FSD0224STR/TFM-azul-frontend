import { CaretRightOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Collapse, theme } from "antd";
const getItems = (panelStyle) => [
  {
    key: "1",
    label: "¿Cómo puedo invitar a otros usuarios a unirse a mi viaje?",
    children: (
      <p>
        Para invitar a otros usuarios a tu viaje, copia el enlace de invitación
        que encontrarás al hacer clic en el ícono de compartir{" "}
        <ShareAltOutlined /> en la parte superior de la página del viaje. Luego,
        envía este enlace a las personas con las que deseas compartir tu viaje
        para que puedan unirse fácilmente.
        <br />
        <br />
        Es importante que los invitados tengan una cuenta registrada y estén
        logueados para poder unirse al viaje.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "2",
    label:
      "¿Mis compañeros pueden invitar a otros usuarios a un viaje que he creado?",
    children: (
      <p>
        Sí, todos los usuarios vinculados a un viaje tienen acceso al enlace de
        invitación. Para unirse a un viaje, es necesario tener una cuenta
        registrada. Si aún no tienen una cuenta, deberán registrarse antes de
        poder vincularse al viaje.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "3",
    label: "¿Quién puede añadir categorías y propuestas al viaje?",
    children: (
      <p>
        Todos los usuarios vinculados al viaje pueden añadir categorías y
        propuestas.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "4",
    label: "¿Quién puede borrar categorías y propuestas del viaje?",
    children: (
      <p>
        Solo se pueden borrar las categorías que no tienen propuestas asociadas.
        Si una categoría tiene propuestas, no se podrá eliminar hasta que todas
        las propuestas sean eliminadas. Las propuestas sólo pueden ser borradas
        por el usuario que las creó.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "5",
    label: "¿Puedo eliminar un viaje si ya no deseo verlo?",
    children: (
      <p>
        Si otros usuarios están vinculados al viaje, no podrás eliminarlo
        completamente. Sin embargo, puedes desvincularte del viaje para dejar de
        verlo en tu lista personal. Si no hay otros usuarios vinculados, tienes
        la opción de borrar el viaje por completo.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "6",
    label: "¿Puedo volver a vincularme a un viaje del que me he desvinculado?",
    children: (
      <p>
        Sí, puedes volver a vincularte a un viaje del que te has desvinculado.
        Para hacerlo, solicita a algún usuario vinculado que te comparta el
        enlace de invitación al viaje.
      </p>
    ),
    style: panelStyle,
  },
];
const FAQs = () => {
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: "rgba(0, 81, 255, 0.100)",
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  return (
    <Collapse
      className="cardInfoTrip"
      bordered={false}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      style={{
        background: token.colorBgContainer,
      }}
      items={getItems(panelStyle)}
    />
  );
};
export default FAQs;
