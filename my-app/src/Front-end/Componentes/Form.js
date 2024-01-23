import FloatingLabel from "react-bootstrap/FloatingLabel";
import Alert from "react-bootstrap/Alert";
import { BiSolidMessageError } from "react-icons/bi";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import * as contants from "../constants";
import Button from "./FormBtn";
import UsePost from "../../Back-end/HTTP/POST";

const styleForm = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

//##########################################################################
//Atualizações -> Implementação do pedido POST

const FormLogin = ({ onEmailChange, onPasswordChange, onSubmit }) => {
  const [Nome, setNome] = useState("");
  const [PalavraPasse, setPalavraPasse] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const { handlePostSubmit } = UsePost({
    Data: { Nome: Nome, PalavraPasse: PalavraPasse },
    FORM_ENDPOINT: "https://gp-api-alpha.vercel.app/login",
  });

  const handleEmailChange = (e) => {
    setNome(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPalavraPasse(e.target.value);
  };

  const verifyCampos = (e) => {
    e.preventDefault();

    if (!PalavraPasse || !Nome) {
      setMessage("Todos os campos devem ser preenchidos.");
      setShow(true);
    } else {
      setShow(false);
      handlePostSubmit();
      if (localStorage.getItem("Token")) {
        navigate("/home");
      }
    }
  };

  return (
    <>
      <Form style={styleForm} onSubmit={verifyCampos}>
        <h3 style={{ color: contants.color.white }} className="mb-4">
          Bem-vindo
        </h3>
        <FloatingLabel
          controlId="floatingInput"
          label="Nome"
          className="w-100 mb-3"
        >
          <Form.Control
            type="Nome"
            placeholder="name@example.com"
            value={Nome}
            onChange={handleEmailChange}
            autoComplete="Nome"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Palavra-passe"
          className="w-100 mb-4"
        >
          <Form.Control
            type="PalavraPasse"
            placeholder="Palavra-passe"
            value={PalavraPasse}
            onChange={handlePasswordChange}
            autoComplete="current-PalavraPasse"
          />
        </FloatingLabel>
        {show ? (
          <Alert
            variant="danger"
            style={{
              width: "100%",
              minHeight: "3.6rem",
              boxShadow: contants.shadow.sm,
              display: "flex",
              gap: "8px",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              padding: "10px",
            }}
            onClose={() => setShow(false)}
            dismissible
          >
            <BiSolidMessageError size={20} />
            <p
              style={{
                color: contants.color.secondary,
                fontSize: "14px",
                marginBottom: 0,
                width: "85%",
              }}
            >
              {message}
            </p>
          </Alert>
        ) : (
          ""
        )}
      </Form>
      <Button id="" label="Entrar" handle={verifyCampos} disable />
    </>
  );
};

export default FormLogin;
