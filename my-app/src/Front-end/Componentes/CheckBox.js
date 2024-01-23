import { useState } from "react";
import { BiCheckbox } from "react-icons/bi";
import { BiCheckboxSquare } from "react-icons/bi";

import * as constants from "../constants";

const Check = ({onChange, state}) => {
  const [select, setSelect] = useState(state);

  const handleClick = () => {
    setSelect(!select);

    if(onChange){
      onChange(select);
    }
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

Check.propsDefault = {
  state: false,
};

export default Check;
