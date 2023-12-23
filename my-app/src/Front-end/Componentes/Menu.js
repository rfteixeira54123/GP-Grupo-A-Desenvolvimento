import Logo from "../Imagens/Full_Blue_Icon.png";
import MenuOption from "./MenuOption";
import Footer from "./Footer";

// Recebe props:
//  id: array com identificadores dos botões
//  label: array com textos dos botões
//  state: array com estados selecionado dos botões
//  link: array com rotas que mostra a nova página ao clique do botão.
const MenuAdmin = (props) => {
  const menuStyle = {
    background: "#9B91D9",
    width: '50vw',
    height: '100%',
    minWidth: '20rem',
    maxWidth: '25rem',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: 'relative'
  };

  return (
    <>
      <div style={menuStyle}>
        <div style={{ width: "100%", height: "10rem"}}>
          <img
            style={{ width: "9rem", padding: "1rem 0 0 2rem" }}
            src={Logo}
            alt="logo"
          />
        </div>
        <div>
          {props.label.map((value, index) => (
            <MenuOption
              key={props.id[index]}
              label={value}
              state={props.state[index]}
              link={props.link[index]}
            />
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MenuAdmin;
