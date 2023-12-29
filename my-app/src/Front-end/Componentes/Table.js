import {Table} from 'react-bootstrap';
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";

import CheckBox from "../Componentes/CheckBox";
import FirstCheckBox from "../Componentes/FirstCheckBox";
import * as constants from "../constants";

const styleContainerTable = {
  position:"relative",
  width: "100%", 
  height: "100%", 
  background: constants.color.white60, 
  overflowY: "auto",
  // boxSizing: "border-box",
  // boxShadow: '1px 1px 0px 0px '+constants.color.secondary,
  // border: "1px "+constants.color.secondary+" solid",
  // borderRadius: 10,
  // borderCollapse: 'collapse',
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
  fontSize: 14,
  minWidth: "1.8rem",
  fontWeight: "500",
  wordWrap: "break-word",
  textAlign: "center",
  padding: "0.3rem",
  paddingInline: "0.7rem",
  border: "1px "+constants.color.secondary+" solid",
  // filter: constants.shadow.sm_md,
};

const styleCell = {
  color: constants.color.secondary,
  fontSize: 14,
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
export const TableEleicoes = (props) => {
  return (
    <>
      <div style={styleContainerTable}>
        <Table bsPrefix style={{width:"100%", borderCollapse: 'collapse'}}>
          <thead style={styleHeader}>
            <tr>
              <th style={{...styleHeaderText, padding: "0px", paddingInline: "0px"}}><FirstCheckBox /></th>
              <th style={styleHeaderText}>Nome</th>
              <th style={styleHeaderText}>Tipo</th>
              <th style={styleHeaderText}>Início</th>
              <th style={styleHeaderText}>Fim</th>
              <th style={{...styleHeaderText, fontSize:11}}>Editar</th>
              <th style={{...styleHeaderText, fontSize:11}}>Apagar</th>
            </tr>
          </thead>
          <tbody style={{overflowY: "auto"}}>
            {props.array.map((obj, index) => (
              <tr key={"RowEleicao"+index} style={{background:(index % 2) !== 0 ? constants.color.primary_light : constants.color.white} }>
                <td style={{...styleCell, padding: "0px", paddingInline: "0px"}}><CheckBox /></td>
                <td style={{...styleCell, textAlign: "start"}}>{obj.nome}</td>
                <td style={styleCell}>{obj.cargo_disputa}</td>
                <td style={styleCell}>{obj.data_inicio}</td>
                <td style={styleCell}>{obj.data_fim}</td>
                <td style={styleCell}><MdOutlineEdit size={25} /></td>
                <td style={styleCell}><AiFillDelete size={22} /></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

// Recebe props:
//  array: objetos do tipo Candidato
export const TableCandidatos = (props) => {
  return (
    <>
      <div style={styleContainerTable}>
        <Table bsPrefix style={{width:"100%", borderCollapse: 'collapse'}}>
          <thead style={styleHeader}>
            <tr>
              <th style={{...styleHeaderText, padding: "0px", paddingInline: "0px"}}><FirstCheckBox /></th>
              <th style={styleHeaderText}>Nome</th>
              <th style={styleHeaderText}>Tipo</th>
              <th style={{...styleHeaderText, fontSize:11}}>Editar</th>
              <th style={{...styleHeaderText, fontSize:11}}>Apagar</th>
            </tr>
          </thead>
          <tbody style={{overflowY: "auto"}}>
            {props.array.map((obj, index) => (
              <tr key={"RowCandidato"+obj.id_candidato} style={{background:(index % 2) !== 0 ? constants.color.primary_light : constants.color.white} }>
                <td style={{...styleCell, padding: "0px", paddingInline: "0px"}}><CheckBox /></td>
                <td style={{...styleCell, textAlign: "start"}}>{obj.nome}</td>
                <td style={styleCell}>{obj.tipo}</td>
                <td style={styleCell}><MdOutlineEdit size={25} /></td>
                <td style={styleCell}><AiFillDelete size={22} /></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

// Recebe props:
//  array: objetos do tipo Utilizador
export const TableUtilizadores = (props) => {
  return (
    <>
      <div style={styleContainerTable}>
        <Table bsPrefix style={{width:"100%", borderCollapse: 'collapse'}}>
          <thead style={styleHeader}>
            <tr>
              <th style={{...styleHeaderText, padding: "0px", paddingInline: "0px"}}><FirstCheckBox /></th>
              <th style={styleHeaderText}>Nome</th>
              <th style={styleHeaderText}>Email</th>
              <th style={styleHeaderText}>Nº ID</th>
              <th style={styleHeaderText}>Tipo</th>
              <th style={styleHeaderText}>Estado</th>
              <th style={{...styleHeaderText, fontSize:11}}>Editar</th>
              <th style={{...styleHeaderText, fontSize:11}}>Apagar</th>
            </tr>
          </thead>
          <tbody style={{overflowY: "auto"}}>
            {props.array.map((user, index) => (
              <tr key={"RowConta"+user.id_conta} style={{background:(index % 2) !== 0 ? constants.color.primary_light : constants.color.white} }>
                <td style={{...styleCell, padding: "0px", paddingInline: "0px"}}><CheckBox /></td>
                <td style={{...styleCell, textAlign: "start"}}>{user.nome}</td>
                <td style={{...styleCell, textAlign: "start"}}>{user.email}</td>
                <td style={styleCell}>{user.numero_id}</td>
                <td style={styleCell}>{user.tipo}</td>
                <td style={styleCell}>{user.estado ? "Desativar" : "Ativar"}</td>
                <td style={styleCell}><MdOutlineEdit size={25} /></td>
                <td style={styleCell}><AiFillDelete size={22} /></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

// Recebe props:
//  array: objetos do tipo Evento
export const TableEventos = (props) => {
  return (
    <>
      <div style={styleContainerTable}>
        <Table bsPrefix style={{width:"100%", borderCollapse: 'collapse'}}>
          <thead style={styleHeader}>
            <tr>
              <th style={{...styleHeaderText, padding: "0px", paddingInline: "0px"}}><FirstCheckBox /></th>
              <th style={styleHeaderText}>Nome</th>
              <th style={styleHeaderText}>Início</th>
              <th style={{...styleHeaderText, fontSize:11}}>Editar</th>
              <th style={{...styleHeaderText, fontSize:11}}>Apagar</th>
            </tr>
          </thead>
          <tbody style={{overflowY: "auto"}}>
            {props.array.map((obj, index) => (
              <tr key={"RowEvento"+obj.id_evento} style={{background:(index % 2) !== 0 ? constants.color.primary_light : constants.color.white} }>
                <td style={{...styleCell, padding: "0px", paddingInline: "0px"}}><CheckBox /></td>
                <td style={{...styleCell, textAlign: "start"}}>{obj.nome}</td>
                <td style={styleCell}>{obj.data}</td>
                <td style={styleCell}><MdOutlineEdit size={25} /></td>
                <td style={styleCell}><AiFillDelete size={22} /></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};