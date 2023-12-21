import Logo from "../Imagens/Full_Blue_Icon.png";
import MenuOption from "./MenuOption";
import Footer from "./Footer";

const MenuAdmin = (props) => {
  const menuStyle = {
    background: "#9B91D9",
    width: '50vw',
    height: '85vh',
    minWidth: '20rem',
    maxWidth: '25rem',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    paddingBottom: "5rem", //necessário para não colocar o fotter acima de outra coisa
    position: 'relative'
  };

  return (
    <>
      <div style={menuStyle}>
        <div style={{ width: "100%" }}>
          <img
            style={{ width: "10rem", paddingLeft: "2rem" }}
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
            />
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MenuAdmin;
