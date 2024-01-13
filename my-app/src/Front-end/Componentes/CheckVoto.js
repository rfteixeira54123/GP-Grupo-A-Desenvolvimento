import { useState } from "react";
import { AiOutlineCheckSquare, AiOutlineBorder  } from "react-icons/ai";
import * as constants from "../constants";

const Check = ({ onChange }) => {
  const [select, setSelect] = useState(false);

  const handleClick = () => {
    setSelect(!select);

    if (onChange) {
      onChange(select);
    }
  };

  if (!select) {
    return (
      <AiOutlineBorder 
        onClick={handleClick}
        size="2rem"
        color={constants.color.secondary}
      />
    );
  } else {
    return (
      <AiOutlineCheckSquare 
        onClick={handleClick}
        size="2rem"
        color={constants.color.secondary}
      />
    );
  }
};

export default Check;
