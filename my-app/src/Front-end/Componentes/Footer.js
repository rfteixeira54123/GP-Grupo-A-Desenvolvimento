import * as constants from "../constants";
import Help from "../Imagens/Icons/Ajuda.png";
import Lang from "../Imagens/Icons/Idioma.png";
import Acess from "../Imagens/Icons/noAcessibilidade.png";

const foot = () => {
  return (
    <div
      style={{
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 30,
        display: "inline-flex",
        position: 'absolute',
        bottom: 0,
      }}
    >
        <img style={{ height: "2rem" }} src={Help} alt="help" />
        <img style={{ height: "2rem", filter: constants.shadow.sm_md }} src={Acess} alt="accessibility" />
        <img style={{ height: "2rem" }} src={Lang} alt="language" />
    </div>
  );
};

export default foot;
