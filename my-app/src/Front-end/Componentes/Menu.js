import { useState } from "react";

import Logo from "../Imagens/Full_Blue_Icon.png";
import MenuOption from "./MenuOption";
import Footer from "./Footer";

// Recebe props:
//  id: array com identificadores dos botões
//  label: array com textos dos botões
//  state: valor que identifica o botão selecionado
//  handle: função a efetuar onClick
const Menu = (props) => {
  const [forceRender, setForceRender] = useState(false);

  const handleOptionClick = (index) => {
    props.handle(index);
    setForceRender(prevState => !prevState);
  };

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
        <div key={forceRender ? 'forceRender' : 'normalRender'}>
          {props.label.map((value, index) => (
            <MenuOption
              key={props.id[index]}
              label={value}
              state={index === props.state}
              handle={() => handleOptionClick(index)}
            />
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Menu;
