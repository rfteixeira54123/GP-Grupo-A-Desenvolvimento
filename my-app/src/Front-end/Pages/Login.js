import Logo from "../Imagens/Full_Blue_Icon.png";
import Footer from "../Componentes/Footer";
import * as contants from "../constants";
import FormLogin from "../Componentes/Form";

const stylePage = {
  position: "relative",
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "row",
};

const styleSide = {
  backgroundColor: contants.color.primary,
  width: "calc(100vw - 100vh)",
  height: "100%",
  minWidth: "30rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
};

const styleInfo = {
  width: "100vh",
  minWidth: "20rem",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
};

const styleWind = {
  backgroundColor: contants.color.dark_gray,
  width: "70%",
  height: "70%",
  borderRadius: "50px",
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const styleTitulo = {
  color: contants.color.secondary,
  width: "100%",
  letterSpacing: 0,
  textAlign: "center",
};

const styleText = {
  color: contants.color.secondary,
  width: "100%",
  letterSpacing: 0,
  textAlign: "justify",
  fontSize: "13px",
  overflow: "auto",
};

// Recebe:
//  text: array com parágrafos de texto a exibir nas informações
const Login = (props) => {
  return (
    <div style={stylePage}>
      <div style={styleSide}>
        <div style={{ width: "80%", maxWidth: "23rem", }}>
          <img
            style={{ width: "16rem", padding: "1rem 0 0 3rem", }}
            src={Logo}
            alt="logo"
          />
          <FormLogin />
        </div>
        <Footer />
      </div>
      <div style={styleInfo}>
        <div style={styleWind}>
          <h2 style={styleTitulo}>Informações</h2>
          <div style={styleText}>
            {props.text.map((value, index) => (
              <p key={index}>{value}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Login.defaultProps = {
  text: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus
    rutrum tellus pellentesque eu tincidunt tortor aliquam.`,
    `Dui sapien eget mi proin sed libero enim. Lectus quam id leo in
    vitae. Commodo elit at imperdiet dui. Tristique risus nec feugiat
    in. Adipiscing commodo elit at imperdiet dui accumsan sit amet
    nulla. Molestie at elementum eu facilisis sed. Fusce id velit ut
    tortor pretium viverra suspendisse. Vel pharetra vel turpis nunc
    eget. Tempor nec feugiat nisl pretium. Pulvinar etiam non quam
    lacus suspendisse faucibus interdum posuere lorem. Mauris cursus
    mattis molestie a iaculis at erat. Enim neque volutpat ac
    tincidunt vitae semper.`,
    `Cum sociis natoque penatibus et magnis dis parturient montes.`,
  ],
};

export default Login;
