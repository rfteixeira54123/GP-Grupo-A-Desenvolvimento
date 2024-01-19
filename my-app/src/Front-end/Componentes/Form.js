import FloatingLabel from "react-bootstrap/FloatingLabel";
import Alert from "react-bootstrap/Alert";
import { BiSolidMessageError } from "react-icons/bi";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import * as contants from "../constants";
import Button from "./FormBtn";
//import usePost from "../HTTPTest/POST";

const styleForm = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

//##########################################################################
//Atualizações -> Implementação do pedido POST

const FormLogin = ({ onEmailChange, onPasswordChange, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (hec) => {
    const newEmail = hec.target.value;
    setEmail(newEmail);
    if (onEmailChange) {
      onEmailChange(newEmail);
    }
  };

  const handlePasswordChange = (hpc) => {
    const newPassword = hpc.target.value;
    setPassword(newPassword);
    if (onPasswordChange) {
      onPasswordChange(newPassword);
    }
  };

  const handleSubmit = () => {
    navigate('/home'); // alterar a posição onde chamar a home da app.
    if (onSubmit) {
      onSubmit(email, password);
      // navigate('/home');
    }
  };

  // const {
  //   handleSubmit: handleLoginSubmit,
  //   status,
  //   message,
  // } = usePost({
  //   Data: { email, password },
  //   FORM_ENDPOINT: "https://gp-api-alpha.vercel.app/login",
  // });

  // Fim das atualizações
  //##########################################################################

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const verifyCampos = () => {
    if (!password || !email) {
      setMessage("Todos os campos devem ser preenchidos.");
      setShow(true);
    } else {
      setShow(false);
      handleSubmit();
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
          label="Email"
          className="w-100 mb-3"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={handleEmailChange}
            autoComplete="email"
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
            value={password}
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
      <Button id="" label="Entrar" handle={verifyCampos} disable />
    </>
  );
};

export default FormLogin;
