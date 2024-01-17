import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
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

const FormLogin = ({ onEmailChange, onPasswordChange, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    if (onSubmit) {
      onSubmit(email, password);
    }
  };

  // const {
  //   handleSubmit: handleLoginSubmit,
  //   status,
  //   message,
  // } = usePost({
  //   Data: { email, password },
  //   FORM_ENDPOINT: "https://gp-api-alpha.vercel.app/user/login",
  // });

  return (
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
          value={email}
          onChange={handleEmailChange}
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
        />
      </FloatingLabel>
      <Link to="/home" style={{ width: "100%" }}>
        <Button id="" label="Entrar" onClick={handleSubmit} />
      </Link>
    </Form>
  );
};

export default FormLogin;
