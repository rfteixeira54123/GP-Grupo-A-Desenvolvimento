import Adecorrer from "./Adecorrer";
import Passadas from "./Passadas";

const styleWindow = {
  background: "pink",
  width: "100%",
  margin: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const content = (props) => {
  switch (props.state) {
    default:
      return (
        <>
          <div style={styleWindow}>Hello World!</div>
        </>
      );
    case 0:
        return(<Adecorrer />);

    case 1:
        return(<Passadas />);
  }
};

export default content;
