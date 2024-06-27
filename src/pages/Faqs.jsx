import { CaretRightOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Collapse, theme } from "antd";

const getItems = (panelStyle) => [
  {
    key: "1",
    label: "Cómo puedo invitar a mis compañeros al viaje?",
    children: (
      <p>
        Es muy fácil, sólo tienes que copiar el enlace del viaje que encontrarás
        en el icono compartir <ShareAltOutlined /> y mandarlo a las personas que
        quieres que se vinculen al viaje que has creado.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "2",
    label: "Mis compañeros podrán invitar a un viaje que he creado yo?",
    children: (
      <p>
        Sí, todas los usuarios que esten vinculados a un viaje tienen acceso al
        link de vinculación. El único requisito para vincularse a un viaje es
        tener una cuenta. Antes de vincularte al viaje deberás registrarte o
        iniciar sesión si ya tienes cuenta.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "3",
    label: "Quién puede añadir categorías y propuestas al viaje?",
    children: (
      <p>Todos los usuarios que esten vinculados al viaje en cuestión. </p>
    ),
    style: panelStyle,
  },
  {
    key: "4",
    label: "Quién puede borrar categorías y propuestas al viaje?",
    children: (
      <p>
        Las categorías que tengan propuestas asociadas no se podran borrar. La
        aplicación sólo permite borrar aquellas categorías que no contienen
        ninguna propuesta.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "5",
    label: "Ya no quiero ver más un viaje, lo puedo borrar?",
    children: (
      <p>
        Si hay otros usuarios vinculados al viaje, no lo podrás borrar. Puede
        que a ellos sí les interese guardar la información del viaje. Si no
        quieres ver más el viaje, tienes la opción de desvincularte. Si te
        desvinculas ya no te parecerá más ese viaje en tu lista de viajes. Si no
        hay otros usuarios vinculados, puedes borrarlo.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "6",
    label: "Puedo volver a vincularme a un viaje que ya he desvinculado?",
    children: (
      <p>
        Sí, pero tendrás que pedir a algun usuario que siga vinculado, que te
        mande el link para poder vincularte.
      </p>
    ),
    style: panelStyle,
  },
];
const FAQs = () => {
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  return (
    <Collapse
      className="cardInfoTrip"
      bordered={false}
      defaultActiveKey={["1"]}
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
