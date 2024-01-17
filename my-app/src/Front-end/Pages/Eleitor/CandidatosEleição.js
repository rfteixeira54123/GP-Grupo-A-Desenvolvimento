import { useState } from "react";
// import "./style.css";

import * as constants from "../../constants";

const styleTitle = {
  color: constants.color.secondary,
  fontSize: "22px",
  width: "100%",
  letterSpacing: 0,
  fontWeight: 600,
  lineHeight: "normal",
  textShadow: constants.shadow.md,
  marginBlock: "15px",
};

const styleWindow = {
  width: "100%",
  margin: "1rem",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const styleContainer = {
  position: "relative",
  width: "100%",
  height: "100%",
  paddingBlock: "1rem",
  paddingInline: "2rem",
  background: constants.color.light_gray,
  borderRadius: "0 0 25px 25px",
  display: "flex",
  alignItems: "start-flex",
  flexDirection: "column",
  gap: "1rem",
};

const styleTop = {
  backgroundColor: constants.color.primary,
  borderRadius: "25px 25px 0 0",
  paddingInline: "2rem",
  paddingBlock: "10px",
  width: "100%",
  position: "sticky",
  top: 0,
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};

const styleName = {
  color: constants.color.white,
  fontSize: "18px",
  fontWeight: 600,
  textShadow: constants.shadow.md,
  textAlign: "start",
  letterSpacing: 1,
};

const styleTime = {
  color: constants.color.secondary,
  fontSize: "14px",
  fontWeight: 500,
  letterSpacing: 0,
};

const Dados = () => {
  return (
    <>
      <div style={styleWindow}>
        <div style={styleTitle}>ELEIÇÕES A DECORRER</div>
        <div style={styleTop}>
          <div style={styleName}>Eleições de Listas 23/24</div>
          <div style={styleTime}>
            Início: 20/11/2023 às 08:00h
            <br />
            Fim: 24/11/2023 às 20:00h
          </div>
        </div>
        <div style={styleContainer}>
          <div style={{ color: constants.color.secondary, fontWeight: 600 }}>
            CANDIDATOS
          </div>
          <div></div>
        </div>
      </div>
      {/* <div className="pgina">
        <div className="overlap">
          <div className="group">
            <div className="frame">
              <div className="text-wrapper">Eleições de Listas 23/24</div>
              <p className="in-cio-s">
                Início: 20/11/2023 às 08:00h
                <br />
                Fim: 24/11/2023 às 20:00h
              </p>
            </div>
          </div>
          <div className="candidatos">CANDIDATOS</div>
          <div className="candidato">
            <div className="foto">
              <div className="overlap-group">
                <img className="star" alt="Star" src="star-1.svg" />
                <div className="div">FOTO</div>
              </div>
            </div>
            <div className="objetivo">
              <div className="objetivos-dolor-sit-wrapper">
                <p className="objetivos-dolor-sit">
                  Objetivos:
                  <br />
                  magnis dis parturient montes, nascetur ridiculus mus. Donec
                  quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
                  Nulla consequat massa quis enim. Donec pede justo, fringilla
                  vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus
                  ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis
                  eu pede mollis pretium. Integer tincidunt. Cras dapibus.
                  Vivamus elementum semper nisi. Aenean vulputate eleifend
                  tellus.
                  <br />
                  <br />
                  Responsáveis:
                  <br />
                  tempus. Donec vitae sapien ut libero venenatis faucibus.
                  Nullam quis ante. Etiam sit amet orci eget eros faucibus
                </p>
              </div>
            </div>
            <div className="text-wrapper-2">Lista L</div>
            <Passar className="passar-instance" />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Dados;
