import Logo from "../Imagens/Full_Blue_Icon.png";
import MenuOption from "./MenuOption";
import Footer from "./Footer";

const MenuAdmin = (props) => {
  const menuStyle = {
    background: "#9B91D9",
    width: '50vw',
    height: '100vh',
    minWidth: '20rem',
    maxWidth: '30rem',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
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
