import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

import * as contants from "../constants";
import Button from "./FormBtn";

const styleForm = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const FormLogin = () => {
  return (
    <Form style={styleForm}>
      <h3 style={{ color: contants.color.white }} className="mb-4">Bem-vindo</h3>
        <FloatingLabel controlId="floatingInput" label="Email" className="w-100 mb-3" >
          <Form.Control type="email" placeholder="name@example.com" />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Palavra-passe" className="w-100 mb-4" >
          <Form.Control type="password" placeholder="Palavra-passe" />
        </FloatingLabel>
      <Link to="/home" style={{ width: "100%", }}><Button id="" label="Entrar" /></Link>
    </Form>
  );
};

export default FormLogin;
