import CheckBox from "./CheckBox";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// Recebe props:
//  itens: String identificador dos itens da tabela.
//  onChange: handle do checkbox.
const FirstCheck = (props) => {
  return (
    <OverlayTrigger placement="right" overlay={<Tooltip>Selecione todos os {props.itens}.</Tooltip>}>
      <CheckBox onChange={props.onChange}/>
    </OverlayTrigger>
  );
};

FirstCheck.defaultProps = {
  itens: "itens",
};


export default FirstCheck;


// const FirstCheck = (props) => {
//   return (
//     <OverlayTrigger placement="right" overlay={<Tooltip>Selecione todos os {props.itens}.</Tooltip>}>
//       {({ ref, ...triggerHandler }) => (
//         <CheckBox ref={ref} {...triggerHandler} />
//       )}
//     </OverlayTrigger>
//   );
// };


