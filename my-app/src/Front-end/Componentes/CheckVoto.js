import { useState } from "react";
import { AiOutlineCheckSquare, AiOutlineBorder } from "react-icons/ai";
import * as constants from "../constants";

const Check = ({ onChange, candidato, state }) => {
  const [select, setSelect] = useState(state);

  const handleClick = () => {
    setSelect(!select);
    onChange(select);
  };

  if (!select) {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            color: constants.color.secondary,
            fontWeight: 600,
            fontSize: "20px",
            textAlign: "start",
          }}
        >
          {candidato.nome}
        </div>
        <AiOutlineBorder
          onClick={handleClick}
          size="2rem"
          color={constants.color.secondary}
        />
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            color: constants.color.secondary,
            fontWeight: 600,
            fontSize: "20px",
            textAlign: "start",
          }}
        >
          {candidato.nome}
        </div>
        <AiOutlineCheckSquare
          onClick={handleClick}
          size="2rem"
          color={constants.color.secondary}
        />
      </div>
    );
  }
};

export default Check;
