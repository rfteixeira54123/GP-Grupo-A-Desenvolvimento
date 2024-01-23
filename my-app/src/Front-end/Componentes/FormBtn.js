import * as contants from "../constants";

const buttonStyle = {
  backgroundColor: contants.color.secondary,
  color: contants.color.white,
  borderRadius: "10px",
  border: "none",
  padding: "15px",
  fontSize: "15px",
  fontWeight: "bold",
  letterSpacing: 1,
  textShadow: contants.shadow.md,
  width: "100%",
  minWidth: "fit-content",
  height: "3.5rem",
  minHeight: "fit-content",
  boxShadow: contants.shadow.md,
  overflow: "hidden",
};

// Recebe props:
//  label: texto do botão
//  handle: ação do botão
const Button = (props) => {
  return (
    <button style={buttonStyle} onClick={props.handle}>
      {props.label}
    </button>
  );
};

export default Button;
