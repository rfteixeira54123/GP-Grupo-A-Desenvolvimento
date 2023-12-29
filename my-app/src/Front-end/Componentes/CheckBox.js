import { useState } from "react";
import { BiCheckbox } from "react-icons/bi";
import { BiCheckboxSquare } from "react-icons/bi";

import * as constants from "../constants";

const Check = () => {
  const [select, setSelect] = useState(false);

  const handleClick = () => {
    setSelect(!select);
  };

  if (!select) {
    return (
      <BiCheckbox
        onClick={handleClick}
        size="2rem"
        color={constants.color.secondary}
      />
    );
  } else {
    return (
      <BiCheckboxSquare
        onClick={handleClick}
        size="2rem"
        color={constants.color.secondary}
      />
    );
  }
};

export default Check;
