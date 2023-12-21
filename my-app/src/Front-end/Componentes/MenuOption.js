import * as constants from "../constants";
import { useState } from 'react';
import { GoArrowRight } from "react-icons/go";

// Recebe props:
//  id: identificador do botão
//  label: texto do botão
//  state: estado selecionado do botão
const MenuBtn = (props) => {

  const [hovering, setHovering] = useState(props.state);
  // Se receber props.state TRUE O item eatá selecionado e NÃO pode ser selecionado
  // Se receber props.state FALSE O item NÃO eatá selecionado e pode ser selecionado

  const handleMouseEnter = () => {
    if(!props.state){
      setHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if(!props.state){
      setHovering(false);
    }
  };

  const buttonStyle = {
    backgroundColor: hovering ? constants.color.secondary : constants.color.white, // Cor alterada quando hover
    transition: 'background-color 0.3s ease', // Adicionando transição suave na mudança de cor
    width: '17rem', 
    height: 50, 
    border: "none",
    borderRadius: 50,
    margin: 5,
    wordWrap: 'break-word',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  };

  const labelStyle = {
    transition: 'color 0.3s ease, transform 0.6s ease',
    transform: hovering ? 'translateX(-20px)' : 'translateX(0)',
    color: hovering ? constants.color.white : constants.color.secondary,
    fontSize: 14, 
    fontFamily: 'verdana', 
    fontWeight: '600',
  };

  const iconStyle = {
    color: constants.color.white,
    fontSize: 30,
    filter: 'drop-shadow(2px 3px 1px rgb(0 0 0 / 0.4))',
    position: 'absolute',
    right: 20,
  };
  
  if(hovering){
    return( 
      <>
      <button id={props.id}
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
          <span style={labelStyle}>
            {props.label}
          </span>
          <GoArrowRight style={iconStyle}/>
      </button>
      </>
    )
  } else {
    return( 
      <>
      <button id={props.id}
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
          <span style={labelStyle}>
            {props.label}
          </span>
      </button>
      </>
    )
  }
  
}

export default MenuBtn;