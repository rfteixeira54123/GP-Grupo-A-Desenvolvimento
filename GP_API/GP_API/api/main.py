import json
from flask import Flask,request,jsonify,abort
from flask_cors import CORS
import auth.auth as auth
from auth.auth import Access
from auth.auth import AuthError

app = Flask(__name__)

CORS(app)





@app.errorhandler(501)
def error_501(error):
    return jsonify({"Error":'Endpoint nÃ£o implementado'}),501

@app.errorhandler(415)
def error_415(error):
    return jsonify({"Error":"Content-type nÃ£o definido para 'application/json'. A ignorar pedido"}),415

@app.errorhandler(422)
def error_422(error):
    return jsonify({"Error":'JSON em falta'}),422

@app.errorhandler(AuthError)
def error_hanlder(error):
    return jsonify({"Error": error}),403

##
## -- LOGIN OU RECUPERCACAO
##
@app.route("/pedido/recuperacao",methods=["POST"])
def pedido_recuperacao():
    if request.data:
        body = request.get_json()
    else:
        abort(422)
    result_status = 501

    if result_status != 200:
        abort(result_status)

@app.route("/_cghpw<string:token>")
def pedido_recupercao_confirm(token):
    result_status = 501

    if result_status != 200:
        abort(result_status)
    

@app.route("/login",methods=["POST"])
def login():
    if request.data:
        body = request.get_json()
    else:
        abort(422)
    result_status = 501
    if result_status != 200:
        abort(result_status)


    
@app.route("/logout",methods=["GET"])
@auth.Authentication(access=[Access.ALUNO,Access.ADMIN])
def logout():
    if request.data:
        body = request.get_json()
    else:
        abort(422)

    result_status = 200
    if result_status != 200:
        abort(result_status)

    return "OK" #NOT IMPLEMENTED

##
## -- 
##


##
## -- Gestao Contas
##

@app.route("/conta/remover",methods=["DELETE"])
@auth.Authentication(access=[Access.ADMIN])
def remover_conta():
    if request.data:
        body = request.get_json()
    else:
        abort(422)
    result_status = 200

    if result_status != 200:
        abort(result_status)

    return "OK"#NOT IMPLEMENTED

@app.route("/conta/listar",methods=["GET"])
@auth.Authentication(access=[Access.ADMIN])
def lista_contas():
    return {"Contas":[{"ID_Conta":1,"Tipo_Conta":'Aluno',"Nome": 'Nome', "Email": 'email@email.com',"Palavra-Passe": 'FDA$#BDHSAI"#232',"estado": True,"acessibilidade": False}] }

@app.route("/conta/inserir",methods=["POST"])
@auth.Authentication(access=[Access.ADMIN])
def inserir_conta():
    if request.data:
        body = request.get_json()
    else:
        abort(422)
    result_status = 501
    if result_status != 200: #200 = OK
        abort(result_status)


@app.route("/conta/editar",methods=["PATCH"])
@auth.Authentication(access=[Access.ALUNO,Access.ADMIN]) #Aluno pode editar sua própria password
def editar_conta():
    if request.data:
        body = request.get_json()
    else:
        abort(422)
    result_status = 501

    if result_status != 200:
        abort(result_status)


@app.route("/conta/definir_ativo",methods=["PATCH"])
@auth.Authentication(access=[Access.ADMIN])
def definir_ativo_conta():
    if request.data:
        body = request.get_json()
    else:
        abort(422)
    result_status = 501

    if result_status != 200:
        abort(result_status)

##
## --
##


##
## -- Gestao Eleicoes
##
@app.route("/eleicao/listar",methods=["GET"])
@auth.Authentication(access=[Access.ALUNO,Access.ADMIN])
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
            ] #Lista de eleiÃ§Ãµes
           }

@app.route("/eleicao/votar",methods=["POST"])
@auth.Authentication(access=[Access.ALUNO])
def votar_eleicao():
    if request.data:
        body = request.get_json()
    else:
        abort(422)

    result_status = 501

    if result_status != 200:
        abort(result_status)

@app.route("/eleicao/criar",methods=["POST"])
@auth.Authentication(access=[Access.ADMIN])
def criar_eleicao():
    
    if request.data:
        body = request.get_json()
    else:
        abort(422)

    result_status = 501

    if result_status != 200:
        abort(result_status)

@app.route("/eleicao/editar",methods=["PATCH"])
@auth.Authentication(access=[Access.ADMIN])
def editar_eleicao():
    if request.data:
        body = request.get_json()
    else:
        abort(422)

    result_status = 501

    if result_status != 200:
        abort(result_status)


@app.route("/eleicao/adicionar_candidato",methods=["POST"])
@auth.Authentication(access=[Access.ADMIN])
def adicionar_candidato_eleicao():
    if request.data:
        body = request.get_json()
    else:
        abort(422)

    result_status = 501

    if result_status != 200:
        abort(result_status)


##
## --
##


@app.route("/candidato/listar",methods=["GET"])
@auth.Authentication(access=[Access.ALUNO,Access.ADMIN])
def listar_candidato():
    return {"Listas":
            [ {"ID_Lista_Candidatos": 1, #Como vai existir multiplos gestores de candidato, precisamos de identificar quem Ã© quem, isto pode ser mudado para "ID_Eleicao" onde este candidato pertence
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
            

@app.route("/candidato/inserir",methods=["POST"])
@auth.Authentication(access=[Access.ADMIN])
def inserir_candidato():
    if request.data:
        body = request.get_json()
    else:
        abort(422)
    result_status = 200

    if result_status != 200:
        abort(result_status)
    return "OK" #NOT IMPLEMENTED

@app.route("/candidato/editar",methods=["PATCH"])
@auth.Authentication(access=[Access.ADMIN])
def editar_candidato():
    if request.data:
        body = request.get_json()
    else:
        abort(422)
    result_status = 200

    if result_status != 200:
        abort(result_status)

    return "OK" #NOT IMPLEMENTED

@app.route("/candidato/remover",methods=["DELETE"])
@auth.Authentication(access=[Access.ADMIN])
def remover_candidato():
    if request.data:
        body = request.get_json()
    else:
        abort(422)
    result_status = 501

    if result_status != 200:
        abort(result_status)


@app.route("/evento/listar",methods=["GET"])
@auth.Authentication(access=[Access.ALUNO,Access.ADMIN])
def listar_evento():
    return {"Eventos":[{
            "ID_Evento":0,
            "Nome":'Nome',
            "Descricao":'Desc',
            "Data":'12/12/2023',
            "Responsavel": 'Respons'
    }
        ]}

@app.route("/evento/inserir",methods=["POST"])
@auth.Authentication(access=[Access.ADMIN])
def inserir_evento():
    if request.data:
        body = request.get_json()
    else:
        abort(422)
    result_status = 501

    if result_status != 200:
        abort(result_status)



@app.route("/test")
def test():
    return "OK"




if __name__ == '__main__':
    app.run(debug=False)