import FloatingLabel from "react-bootstrap/FloatingLabel";
import Alert from "react-bootstrap/Alert";
import { BiSolidMessageError } from "react-icons/bi";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import * as contants from "../constants";
import Button from "./FormBtn";
import UsePost from "../../Back-end/HTTP/POST";
import useGet from "../../Back-end/HTTP/GET";

const styleForm = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

//##########################################################################
//Atualizações -> Implementação do pedido POST

const FormLogin = () => {
  const [Email, setEmail] = useState(localStorage.getItem("email"));
  const [PalavraPasse, setPalavraPasse] = useState(
    localStorage.getItem("pass")
  );
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const { handlePostSubmit, status, msg, res } = UsePost({
    Data: { Email: Email, PalavraPasse: PalavraPasse },
    FORM_ENDPOINT: "https://gp-api-alpha.vercel.app/login",
  });

  const { handleGetSubmit, gstatus, gmsg, gres } = useGet({
    Data: -1,
    FORM_ENDPOINT: "https://gp-api-alpha.vercel.app/conta/detalhes",
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPalavraPasse(e.target.value);
  };

  const verifyCampos = (e) => {
    e.preventDefault();

    if (!PalavraPasse || !Email) {
      setMessage("Todos os campos devem ser preenchidos.");
      setShow(true);
    } else {
      if (PalavraPasse .length < 8 || Email.length < 8) {
        setMessage("Os campos devem conter no mínimo 8 caracteres.");
        setShow(true);
      } else {
        setShow(false);
        handlePostSubmit()
          .then((data) => {
            if (localStorage.getItem("Token")) {
              handleGetSubmit().then(() => {
                navigate("/home");
              });
            }
          })
          .catch((error) => {
            setMessage(error);
            setShow(true);
          });
      }
    }
  };

  return (
    <>
      <Form style={styleForm}>
        <h3 style={{ color: contants.color.white }} className="mb-4">
          Bem-vindo
        </h3>
        <FloatingLabel
          controlId="floatingInput"
          label="Email"
          className="w-100 mb-3"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            defaultValue={Email}
            onChange={handleEmailChange}
            autoComplete="Email"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Palavra-passe"
          className="w-100 mb-4"
        >
          <Form.Control
            type="password"
            placeholder="Palavra-passe"
            defaultValue={PalavraPasse}
            onChange={handlePasswordChange}
            autoComplete="current-password"
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
      <Button label="Entrar" handle={verifyCampos} />
    </>
  );
};

export default FormLogin;
