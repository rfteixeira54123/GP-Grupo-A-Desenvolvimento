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
  width: "80%",
  height: "80%",
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
  paddingInline: "10px",
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
              <p key={index}>{value}<br /></p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Login.defaultProps = {
  text: [
    `Bem-vindo à plataforma de votação online, o Voto Online, 
    um espaço dedicado a fortalecer a participação democrática 
    e a voz dos estudantes da prestigiada Instituição de Ensino 
    Xpto. O nosso compromisso é proporcionar um ambiente seguro 
    e eficiente para a realização de votações em eleições 
    estudantis, garantindo a transparência e a representatividade 
    no processo decisório.`,
    `A plataforma Voto Online destina-se exclusivamente aos alunos 
    matriculados na Instituição de Ensino Xpto. O nosso foco é 
    proporcionar uma ferramenta personalizada que atenda às 
    necessidades específicas da comunidade estudantil, promovendo 
    a representatividade e a diversidade de opiniões.`,
    `Para aceder aos serviços da plataforma, é indispensável 
    possuir credenciais válidas fornecidas pela sua instituição de 
    ensino. Se esta é a sua primeira vez utilizando o Voto Online e 
    não possui as suas credenciais, recomendamos que verifique o seu 
    email institucional. Muitas vezes, as informações necessárias são 
    enviadas para este endereço.
    Caso não encontre as credenciais no seu email, ou em caso de 
    dúvidas, entre em contato diretamente com a sua instituição de 
    ensino. A equipa responsável estará pronta para fornecer as 
    orientações necessárias e garantir que tenha acesso pleno à 
    plataforma.`,
    `Contamos com a sua participação ativa e empenhada no Voto Online. 
    Juntos, moldaremos o futuro estudantil da Instituição de Ensino Xpto, 
    tornando cada eleição um reflexo verdadeiro dos desejos e necessidades 
    da nossa comunidade académica.`,
  ],
};

export default Login;
