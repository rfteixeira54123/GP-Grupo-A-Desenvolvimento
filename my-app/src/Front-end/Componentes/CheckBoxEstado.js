import { useState } from "react";
import { BiCheckbox } from "react-icons/bi";
import { BiCheckboxChecked } from "react-icons/bi";

import * as constants from "../constants";

const style = {
  display: "flex",
  alignItems: "center",
  gap: "3px",
};

const styleText = {
  textDecoration: "underline",
  paddingTop: "3px",
};

const Check = (props) => {
  const [select, setSelect] = useState(props.state);

  const handleClick = () => {
    setSelect(!select);
  };

  if (!select) {
    return (
      <>
        <div style={style} onClick={handleClick}>
          <BiCheckbox size="1.7rem" color={constants.color.secondary} />
          <span style={styleText}>Ativar</span>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div style={style} onClick={handleClick}>
          <BiCheckboxChecked size="1.7rem" color={constants.color.secondary} />
          <span style={styleText}>Desativar</span>
        </div>
      </>
    );
  }
};

export default Check;
