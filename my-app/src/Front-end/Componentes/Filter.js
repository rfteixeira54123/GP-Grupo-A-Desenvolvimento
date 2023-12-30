import { TbFilter, TbFilterFilled } from "react-icons/tb";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { LuCalendarDays, LuClock } from "react-icons/lu";

import * as constants from "../constants";

const styleFilter = {
  width: "100%",
  backgroundColor: constants.color.primary,
  marginBottom: "15px",
  borderBottom: "2px " + constants.color.secondary + " solid",
  borderRadius: "23px 23px 0px 0px",
  paddingBlock: "5px",
  paddingInline: "25px",
  color: constants.color.secondary,
};

//Recebe props
//  id: identifica o filtro a exibir.
//  handle: função a efetuar onClick filter... onChange... adaptar
const Filter = (props) => {
  const [select, setSelect] = useState(false);
  const [filtered, setFiltered] = useState(false);

  const handleClick = (handle) => {
    setSelect(!select);
  };

  const handleFilter = (e) => {
    // console.log(e.target.value);
    setFiltered(e.target.value !== "");
  };

  const formUtilizadores = () => {
    return (
      <Form>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column sm="1">
            Nome:
          </Form.Label>
          <Col sm="5">
            <Form.Control size="sm" onChange={handleFilter} />
          </Col>

          <Col sm="1"></Col>

          <Form.Label column sm="1">
            Tipo:
          </Form.Label>
          <Col sm="3">
            <Form.Select size="sm" onChange={handleFilter}>
              <option></option>
              <option value="0">Administrador</option>
              <option value="1">Eleitor</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2">
          <Form.Label column sm="1">
            Nº de ID:
          </Form.Label>
          <Col sm="5">
            <Form.Control size="sm" onChange={handleFilter} />
          </Col>

          <Col sm="1"></Col>

          <Form.Label column sm="1">
            Estado:
          </Form.Label>
          <Col sm="3">
            <Form.Select size="sm" onChange={handleFilter}>
              <option></option>
              <option value="0">Desativado</option>
              <option value="1">Ativado</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2" controlId="formPlaintextEmail">
          <Form.Label column sm="1">
            Email:
          </Form.Label>
          <Col sm="5">
            <Form.Control size="sm" onChange={handleFilter} />
          </Col>
        </Form.Group>
      </Form>
    );
  };

  const formEleicoes = () => {
    return (
      <Form>
        <Form.Group as={Row} className="mb-2">
          <Form.Label column sm="1">
            Nome:
          </Form.Label>
          <Col sm="5">
            <Form.Control size="sm" onChange={handleFilter} />
          </Col>

          <Col sm="1"></Col>

          <Form.Label column sm="1">
            Tipo:
          </Form.Label>
          <Col sm="3">
            <Form.Select size="sm" onChange={handleFilter}>
              <option></option>
              <option value="0">Associação de Estudantes</option>
              <option value="1">Conselho Fiscal</option>
              <option value="2">Assembleia Geral</option>
              <option value="3">Direção</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2" controlId="formPlaintextEmail">
          <Form.Label column sm="1">
            Data:
          </Form.Label>

          <Col sm="3" style={{ position: "relative" }}>
            <div style={{ position: "absolute", right: "22px", top: "2px" }}>
              <LuCalendarDays />
            </div>
            <Form.Control size="sm" onChange={handleFilter} />
          </Col>

          <Col sm="3" style={{ position: "relative" }}>
            <div style={{ position: "absolute", right: "22px", top: "2px" }}>
              <LuClock />
            </div>
            <Form.Control size="sm" onChange={handleFilter} />
          </Col>
        </Form.Group>
      </Form>
    );
  };

  const form = (id) => {
    switch (id) {
      case 0:
        return formUtilizadores();
      case 1:
        return formEleicoes();
      default:
        return <></>;
    }
  };

  if (select) {
    return (
      <>
        <div style={styleFilter}>
          <div style={{ display: "flex", alignItems: "self-end", gap: "5px" }}>
            {filtered ? <TbFilterFilled size={25} /> : <TbFilter size={25} />}
            <span>Filter:</span>
          </div>
          <div style={{ position: "relative" }}>
            {form(props.id)}
            <div style={{ position: "absolute", bottom: 0, right: 0 }}>
              <TiArrowSortedUp
                size={30}
                onClick={() => {
                  props.handle();
                  handleClick();
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          style={styleFilter}
          onClick={() => {
            props.handle();
            handleClick();
          }}
        >
          <div style={{ display: "flex", alignItems: "self-end", gap: "5px" }}>
            {filtered ? <TbFilterFilled size={25} /> : <TbFilter size={25} />}
            <span>Filter:</span>
            <TiArrowSortedDown size={22} />
          </div>
        </div>
      </>
    );
  }
};

export default Filter;

