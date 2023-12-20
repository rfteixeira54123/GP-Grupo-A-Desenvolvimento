
import json
from flask import Flask,request,jsonify,abort

app = Flask(__name__)






@app.errorhandler(501)
def handle_error(error):
    return jsonify({"Error":'Endpoint not yet implemented'},501)



##
## -- LOGIN OU RECUPERCACAO
##
@app.route("/pedido/recuperacao")
def pedido_recuperacao():
    body = request.get_json()
    result_status = 501

    if result_status != 200:
        abort(result_status)

@app.route("/_cghpw<string:token>")
def pedido_recupercao_confirm(token):
    result_status = 501

    if result_status != 200:
        abort(result_status)
    

@app.route("/login")
def login():
    body = request.get_json()
    result_status = 501
    if result_status != 200:
        abort(result_status)

@app.route("/logout")
def logout():
    body = request.get_json()
    result_status = 501
    if result_status != 200:
        abort(result_status)

##
## -- 
##


##
## -- Gestao Contas
##

@app.route("/conta/remover")
def remover_conta():
    body = request.get_json()
    result_status = 501

    if result_status != 200:
        abort(result_status)

@app.route("/conta/listar",methods=["GET"])
def lista_contas():
    return {"Contas":[{"ID_Conta":1,"Tipo_Conta":'Aluno',"Nome": 'Nome', "Email": 'email@email.com',"Palavra-Passe": 'FDA$#BDHSAI"#232',"estado": True,"acessibilidade": False}] }

@app.route("/conta/inserir",methods=["POST"])
def inserir_conta():
    body = request.get_json()
    result_status = 501
    if result_status != 200: #200 = OK
        abort(result_status)


@app.route("/conta/editar",methods=["PATCH"])
def editar_conta():
    body = request.get_json()
    result_status = 501

    if result_status != 200:
        abort(result_status)


@app.route("/conta/definir_ativo")
def definir_ativo_conta():
    body = request.get_json()
    result_status = 501

    if result_status != 200:
        abort(result_status)

##
## --
##


##
## -- Gestao Eleicoes
##
@app.route("/eleicao/listar")
def lista_eleicao():
    return {"Eleicoes":
            [
                {"ID_Eleicao":1,
                 "Nome":'Nome',
                 "Data_Inicio":'12/12/2023',
                 "Data_Fim":'12/12/2023',
                 "Eleitores_presenca":[1,2], #Lista de presencas
                 "Descricao":'Desc',
                 "Cargo_Disputa":'Cargo',
                 "Estado":True,
                 "Candidatos":
                 [
                     {"ID_Candidato":1,
                      "Nome":'Nome',
                      "Tipo":'Tipo',
                      "Descricao":'Desc',
                      "Votos":0
                      }
                 ] #Lista de candidatos
                }
            ] #Lista de eleições
           }

@app.route("/eleicao/votar")
def votar_eleicao():
    body = request.get_json()
    result_status = 501

    if result_status != 200:
        abort(result_status)

@app.route("/eleicao/criar")
def criar_eleicao():
    body = request.get_json()
    result_status = 501

    if result_status != 200:
        abort(result_status)

@app.route("/eleicao/editar")
def editar_eleicao():
    body = request.get_json()
    result_status = 501

    if result_status != 200:
        abort(result_status)


@app.route("/eleicao/adicionar_candidato")
def adicionar_candidato_eleicao():
    body = request.get_json()
    result_status = 501

    if result_status != 200:
        abort(result_status)


##
## --
##


@app.route("/candidato/listar")
def listar_candidato():
    return {"Listas":
            [ {"ID_Lista_Candidatos": 1, #Como vai existir multiplos gestores de candidato, precisamos de identificar quem é quem, isto pode ser mudado para "ID_Eleicao" onde este candidato pertence
           "Candidatos":
                 [
                     {"ID_Candidato":1,
                      "Nome":'Nome',
                      "Tipo":'Tipo',
                      "Descricao":'Desc',
                      "Votos":0
                      }
                 ] #Lista de candidatos
            }]}
            

@app.route("/candidato/inserir")
def inserir_candidato():
    body = request.get_json()
    result_status = 501

    if result_status != 200:
        abort(result_status)

@app.route("/candidato/editar")
def editar_candidato():
    body = request.get_json()
    result_status = 501

    if result_status != 200:
        abort(result_status)

@app.route("/candidato/remover")
def remover_candidato():
    body = request.get_json()
    result_status = 501

    if result_status != 200:
        abort(result_status)


@app.route("/evento/listar")
def listar_evento():
    return {"Eventos":[{
            "ID_Evento":0,
            "Nome":'Nome',
            "Descricao":'Desc',
            "Data":'12/12/2023',
            "Responsavel": 'Respons'
    }
        ]}

@app.route("/evento/inserir")
def inserir_evento():
    body = request.get_json()
    result_status = 501

    if result_status != 200:
        abort(result_status)



@app.route("/test")
def test():
    return "OK"




if __name__ == '__main__':
    app.run(debug=False)