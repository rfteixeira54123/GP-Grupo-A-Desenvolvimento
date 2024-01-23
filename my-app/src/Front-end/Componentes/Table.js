import { useState } from "react";
import {Table} from 'react-bootstrap';
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";

import CheckBox from "../Componentes/CheckBox";
import CheckBoxEstado from "../Componentes/CheckBoxEstado";
import * as constants from "../constants";

const styleContainerTable = {
  position:"relative",
  width: "100%", 
  height: "100%", 
  background: constants.color.white60, 
  overflowY: "auto",
  boxSizing: "content-box",
  boxShadow: '0px 0px 0px 1px '+constants.color.secondary,
  border: "1px "+constants.color.secondary+" solid",
  borderRadius: "12px",
  borderCollapse: 'collapse',
}

const styleHeader = {
  background: constants.color.primary,
  height: "2rem",
  position:"sticky",
  top: 0,
  boxShadow: '0px 0px 1px 2px '+constants.color.secondary,
};

const styleHeaderText = {
  color: constants.color.white,
  fontSize: "14px",
  fontWeight: "500",
  letterSpacing: 1,
  minWidth: "1.8rem",
  wordWrap: "break-word",
  textAlign: "center",
  padding: "0.3rem",
  paddingInline: "0.7rem",
  border: "1px "+constants.color.secondary+" solid",
  filter: constants.shadow.small,
};

const styleCell = {
  color: constants.color.secondary,
  fontSize: "16px",
  minWidth: "2rem", 
  fontWeight: "500",
  wordWrap: "break-word",
  textAlign: "center",
  padding: "0.3rem",
  paddingInline: "0.7rem",
  border: "1px "+constants.color.secondary+" solid",
};


// Recebe props:
//  array: objetos do tipo Eleicao
//  handleCheckboxChange: método que lida com a seleção dos checkboxes.
//  handleDelete: método chamado ao clique do botões de remover.
//  handleEdit: método chamado ao clique do botões de editar.
export const TableEleicoes = (props) => {

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const handleChange = (checkboxId) => {
    let updatedCheckboxes = [];

    // Atualiza a lista de checkBoxes selecionados
    if(!selectedCheckboxes.includes(checkboxId)){
      updatedCheckboxes = [...selectedCheckboxes, checkboxId];
    } else {
      updatedCheckboxes = selectedCheckboxes.filter((id) => id !== checkboxId);
    }

    setSelectedCheckboxes(updatedCheckboxes);
    props.handleCheckboxChange(updatedCheckboxes);
  };

  const [show, setShow] = useState(false);

  const handleTooltip = (aShow) => {
    setShow(aShow);
  };


  return (
    <>
      <div style={styleContainerTable}>
        <Table bsPrefix style={{width:"100%", borderCollapse: 'collapse'}}>
          <thead style={styleHeader}>
            <tr>
            <th onMouseEnter={()=>handleTooltip(true)}
              onMouseLeave={()=>handleTooltip(false)}
              style={{
                border: "1px "+constants.color.secondary+" solid", 
                textAlign: "center",
              }}>
                <div style={{
                  display: show ? "block" : "none",
                  position: "absolute",
                  top: "1.4rem",
                  left: "1.4rem",
                  border: "1px solid"+constants.color.secondary,
                  borderRadius: "4px",
                  backgroundColor: constants.color.white90,
                  color: constants.color.secondary,
                  fontSize: "12px",
                  fontWeight: 500, 
                  paddingInline: "10px",
                  paddingBlock: "2px",
                  zIndex: 5,
                }}>
                    Selecione todos os utilizadores.
                  </div>
                  <CheckBox onChange={() => handleChange(-1)}/>
              </th>
              <th style={styleHeaderText}>Nome</th>
              <th style={styleHeaderText}>Tipo</th>
              <th style={styleHeaderText}>Início</th>
              <th style={styleHeaderText}>Fim</th>
              <th style={{...styleHeaderText, fontSize:12}}>Editar</th>
              <th style={{...styleHeaderText, fontSize:12}}>Apagar</th>
            </tr>
          </thead>
          <tbody style={{overflowY: "auto"}}>
            {(props.array.length > 0) ?
              props.array.map((obj, index) => (
                <tr key={"RowEleicao"+index} style={{background:(index % 2) !== 0 ? constants.color.primary_light : constants.color.white} }>
                  <td style={{...styleCell, padding: "0px", paddingInline: "0px"}}><CheckBox onChange={() => handleChange(obj.id_eleicao)}/></td>
                  <td style={{...styleCell, textAlign: "start"}}>{obj.nome}</td>
                  <td style={styleCell}>{obj.cargo_disputa}</td>
                  <td style={styleCell}>{obj.data_inicio}</td>
                  <td style={styleCell}>{obj.data_fim}</td>
                  <td style={styleCell} onClick={() => props.handleEdit(obj)} ><MdOutlineEdit size={25} /></td>
                  <td style={styleCell} onClick={() => props.handleDelete(obj)}><AiFillDelete size={22} /></td>
                </tr>
              ))  : 
              <tr>
                <td colSpan={7} 
                style={{
                  textAlign: "center",
                  paddingBlock: "2rem",
                  color: constants.color.secondary,
                }}
                >
                  Não há eleições a exibir.
                </td>
              </tr>
           }
          </tbody>
        </Table>
      </div>
    </>
  );
};

// Recebe props:
//  array: objetos do tipo Candidato
//  handleCheckboxChange: método que lida com a seleção dos checkboxes.
//  handleDelete: método chamado ao clique do botões de remover.
//  handleEdit: método chamado ao clique do botões de editar.
export const TableCandidatos = (props) => {

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const handleChange = (checkboxId) => {
    let updatedCheckboxes = [];

    // Atualiza a lista de checkBoxes selecionados
    if(!selectedCheckboxes.includes(checkboxId)){
      updatedCheckboxes = [...selectedCheckboxes, checkboxId];
    } else {
      updatedCheckboxes = selectedCheckboxes.filter((id) => id !== checkboxId);
    }

    setSelectedCheckboxes(updatedCheckboxes);
    props.handleCheckboxChange(updatedCheckboxes);
  };

  const [show, setShow] = useState(false);

  const handleTooltip = (aShow) => {
    setShow(aShow);
  };


  return (
    <>
      <div style={styleContainerTable}>
        <Table bsPrefix style={{width:"100%", borderCollapse: 'collapse'}}>
          <thead style={styleHeader}>
            <tr>
            <th onMouseEnter={()=>handleTooltip(true)}
              onMouseLeave={()=>handleTooltip(false)}
              style={{
                border: "1px "+constants.color.secondary+" solid", 
                textAlign: "center",
              }}>
                <div style={{
                  display: show ? "block" : "none",
                  position: "absolute",
                  top: "1.4rem",
                  left: "1.4rem",
                  border: "1px solid"+constants.color.secondary,
                  borderRadius: "4px",
                  backgroundColor: constants.color.white90,
                  color: constants.color.secondary,
                  fontSize: "12px",
                  fontWeight: 500, 
                  paddingInline: "10px",
                  paddingBlock: "2px",
                  zIndex: 5,
                }}>
                    Selecione todos os utilizadores.
                  </div>
                  <CheckBox onChange={() => handleChange(-1)}/>
              </th>
              <th style={styleHeaderText}>Nome</th>
              <th style={styleHeaderText}>Tipo</th>
              <th style={{...styleHeaderText, fontSize:12}}>Editar</th>
              <th style={{...styleHeaderText, fontSize:12}}>Apagar</th>
            </tr>
          </thead>
          <tbody style={{overflowY: "auto"}}>
            {(props.array.length > 0) ?
              props.array.map((obj, index) => (
                <tr key={"RowCandidato"+obj.id_candidato} style={{background:(index % 2) !== 0 ? constants.color.primary_light : constants.color.white} }>
                  <td style={{...styleCell, padding: "0px", paddingInline: "0px"}}><CheckBox onChange={() => handleChange(obj.id_candidato)} /></td>
                  <td style={{...styleCell, textAlign: "start"}}>{obj.nome}</td>
                  <td style={styleCell}>{obj.tipo}</td>
                  <td style={styleCell} onClick={() => props.handleEdit(obj)} ><MdOutlineEdit size={25} /></td>
                  <td style={styleCell} onClick={() => props.handleDelete(obj)} ><AiFillDelete size={22} /></td>
                </tr>
              ))  : 
              <tr>
                <td colSpan={5} 
                style={{
                  textAlign: "center",
                  paddingBlock: "2rem",
                  color: constants.color.secondary,
                }}
                >
                  Não há candidatos a exibir.
                </td>
              </tr>
           }
          </tbody>
        </Table>
      </div>
    </>
  );
};

// Recebe props:
//  array: objetos do tipo Utilizador
//  handleCheckboxChange: método que lida com a seleção dos checkboxes.
//  handleDelete: método chamado ao clique do botões de remover.
//  handleEdit: método chamado ao clique do botões de editar.
//  handleEnable: método chamado ao clique do checkbox de estado.
export const TableUtilizadores = (props) => {

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const handleChange = (checkboxId) => {
    let updatedCheckboxes = [];

    // Atualiza a lista de checkBoxes selecionados
    if(!selectedCheckboxes.includes(checkboxId)){
      updatedCheckboxes = [...selectedCheckboxes, checkboxId];
    } else {
      updatedCheckboxes = selectedCheckboxes.filter((id) => id !== checkboxId);
    }

    setSelectedCheckboxes(updatedCheckboxes);
    props.handleCheckboxChange(updatedCheckboxes);
  };

  const [show, setShow] = useState(false);

  const handleTooltip = (aShow) => {
    setShow(aShow);
  };


  return (
    <>
      <div style={styleContainerTable}>
        <Table bsPrefix style={{width:"100%", borderCollapse: 'collapse'}}>
          <thead style={styleHeader}>
            <tr>
              <th onMouseEnter={()=>handleTooltip(true)}
              onMouseLeave={()=>handleTooltip(false)}
              style={{
                border: "1px "+constants.color.secondary+" solid", 
                textAlign: "center",
              }}>
                <div style={{
                  display: show ? "block" : "none",
                  position: "absolute",
                  top: "1.4rem",
                  left: "1.4rem",
                  border: "1px solid"+constants.color.secondary,
                  borderRadius: "4px",
                  backgroundColor: constants.color.white90,
                  color: constants.color.secondary,
                  fontSize: "12px",
                  fontWeight: 500, 
                  paddingInline: "10px",
                  paddingBlock: "2px",
                  zIndex: 5,
                }}>
                    Selecione todos os utilizadores.
                  </div>
                  <CheckBox onChange={() => handleChange(-1)}/>
              </th>
              <th style={styleHeaderText}>Nome</th>
              <th style={styleHeaderText}>Email</th>
              <th style={styleHeaderText}>Nº ID</th>
              <th style={styleHeaderText}>Tipo</th>
              <th style={styleHeaderText}>Estado</th>
              <th style={{...styleHeaderText, fontSize:12}}>Editar</th>
              <th style={{...styleHeaderText, fontSize:12}}>Apagar</th>
            </tr>
          </thead>
          <tbody style={{overflowY: "auto"}}>
            {(props.array.length > 0) ?
              props.array.map((user, index) => (
                <tr key={"RowConta"+user.id_conta} style={{background:(index % 2) !== 0 ? constants.color.primary_light : constants.color.white} }>
                  <td style={{...styleCell, padding: "0px", paddingInline: "0px"}}><CheckBox onChange={() => handleChange(user.id_conta)}/></td>
                  <td style={{...styleCell, textAlign: "start"}}>{user.nome}</td>
                  <td style={{...styleCell, textAlign: "start"}}>{user.email}</td>
                  <td style={styleCell}>{user.numero_id}</td>
                  <td style={styleCell}>{user.tipo}</td>
                  <td style={styleCell} onClick={() => props.handleEnable(user)} ><CheckBoxEstado state={user.estado} /></td>
                  <td style={styleCell} onClick={() => props.handleEdit(user)} ><MdOutlineEdit size={25} /></td>
                  <td style={styleCell} onClick={() => props.handleDelete(user)}><AiFillDelete size={22} /></td>
                </tr>
              ))  : 
              <tr>
                <td colSpan={8} 
                style={{
                  textAlign: "center",
                  paddingBlock: "2rem",
                  color: constants.color.secondary,
                }}
                >
                  Não há contas a exibir.
                </td>
              </tr>
           }
          </tbody>
        </Table>
      </div>
    </>
  );
};

// Recebe props:
//  array: objetos do tipo Evento
//  handleCheckboxChange: método que lida com a seleção dos checkboxes.
//  handleDelete: método chamado ao clique do botões de remover.
//  handleEdit: método chamado ao clique do botões de editar.
export const TableEventos = (props) => {

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const handleChange = (checkboxId) => {
    let updatedCheckboxes = [];

    // Atualiza a lista de checkBoxes selecionados
    if(!selectedCheckboxes.includes(checkboxId)){
      updatedCheckboxes = [...selectedCheckboxes, checkboxId];
    } else {
      updatedCheckboxes = selectedCheckboxes.filter((id) => id !== checkboxId);
    }

    setSelectedCheckboxes(updatedCheckboxes);
    props.handleCheckboxChange(updatedCheckboxes);
  };

  const [show, setShow] = useState(false);

  const handleTooltip = (aShow) => {
    setShow(aShow);
  };


  return (
    <>
      <div style={styleContainerTable}>
        <Table bsPrefix style={{width:"100%", borderCollapse: 'collapse'}}>
          <thead style={styleHeader}>
            <tr>
            <th onMouseEnter={()=>handleTooltip(true)}
              onMouseLeave={()=>handleTooltip(false)}
              style={{
                border: "1px "+constants.color.secondary+" solid", 
                textAlign: "center",
              }}>
                <div style={{
                  display: show ? "block" : "none",
                  position: "absolute",
                  top: "1.4rem",
                  left: "1.4rem",
                  border: "1px solid"+constants.color.secondary,
                  borderRadius: "4px",
                  backgroundColor: constants.color.white90,
                  color: constants.color.secondary,
                  fontSize: "12px",
                  fontWeight: 500, 
                  paddingInline: "10px",
                  paddingBlock: "2px",
                  zIndex: 5,
                }}>
                    Selecione todos os utilizadores.
                  </div>
                  <CheckBox onChange={() => handleChange(-1)}/>
              </th>
              <th style={styleHeaderText}>Nome</th>
              <th style={styleHeaderText}>Início</th>
              <th style={{...styleHeaderText, fontSize:12}}>Editar</th>
              <th style={{...styleHeaderText, fontSize:12}}>Apagar</th>
            </tr>
          </thead>
          <tbody style={{overflowY: "auto"}}>
            {(props.array.length > 0) ?
              props.array.map((obj, index) => (
                <tr key={"RowEvento"+obj.id_evento} style={{background:(index % 2) !== 0 ? constants.color.primary_light : constants.color.white} }>
                  <td style={{...styleCell, padding: "0px", paddingInline: "0px"}}><CheckBox onChange={() => handleChange(obj.id_evento)} /></td>
                  <td style={{...styleCell, textAlign: "start"}}>{obj.nome}</td>
                  <td style={styleCell}>{obj.data}</td>
                  <td style={styleCell} onClick={() => props.handleEdit(obj)} ><MdOutlineEdit size={25} /></td>
                  <td style={styleCell} onClick={() => props.handleDelete(obj)}><AiFillDelete size={22} /></td>
                </tr>
              ))  : 
              <tr>
                <td colSpan={5} 
                style={{
                  textAlign: "center",
                  paddingBlock: "2rem",
                  color: constants.color.secondary,
                }}
                >
                  Não há eventos a exibir.
                </td>
              </tr>
           }
          </tbody>
        </Table>
      </div>
    </>
  );
};