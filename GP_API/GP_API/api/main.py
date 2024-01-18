from errors import *
import psycopg2
from flask import Flask,request,jsonify,abort
from flask_cors import CORS
import auth as auth
from auth import refresh_token, error_type
import os
from dataclasses import dataclass
import jwt
import datetime
from json_checker import CheckJson





app = Flask(__name__)
'''
TODO
Implementacao Base de dados + Nota no "/candidato/listar"
Testar com dados de teste
Sistema Email Flask
'''
CORS(app)






def getconnectionDB():
    connection = psycopg2.connect(host=os.environ["Host"],
                                         user=os.environ["User"], 
                                         password=os.environ["Password"],
                                         database=os.environ["DataBase"],
                                         port=os.environ["Port"])
    return connection

#getconnectionDB().close()

@app.errorhandler(ERRO_INTERNO)
def error_501(error):
    return jsonify({"Error":'Erro de servidor Interno'}),ERRO_INTERNO

@app.errorhandler(ERRO_NAO_IMPLEMENTADO)
def error_501(error):
    return jsonify({"Error":'Endpoint nÃ£o implementado'}),ERRO_NAO_IMPLEMENTADO

@app.errorhandler(ERRO_CONTENT_TYPE)
def error_415(error):
    return jsonify({"Error":"Content-type nÃ£o definido para 'application/json'. A ignorar pedido"}),ERRO_CONTENT_TYPE

@app.errorhandler(ERRO_JSON_MISSING)
def error_422(error):
    return jsonify({"Error":'JSON em falta'}),ERRO_JSON_MISSING

@app.errorhandler(AuthFalta)
def error_no_token(error):
    return jsonify({"Error": error}),ERRO_AUTENTICACAO_FALTA

@app.errorhandler(AuthErroLogin)
def error_hanlder(error):
    return jsonify({"Error": error}),ERRO_AUTENTICACAO

@app.errorhandler(AuthInvalido)
def erro_autenticacao_invalida(error):
    return jsonify({"Error": error}),ERRO_AUTENTICACAO_INVALIDA

@app.errorhandler(AuthExpire)
def erro_autenticacao_invalida(error):
    return jsonify({"Error": error}),ERRO_AUTENTICACAO_EXPIRE
    
@app.errorhandler(JSONPropError)
def error_handler(error):
    return jsonify({"Error": error}),ERRO_JSON_PROPERTY

@app.errorhandler(JSONTypeError)
def error_handler(error):
    return jsonify({"Error": error}),ERRO_JSON_TYPE

@app.errorhandler(JSONSizeError)
def error_handler(error):
    return jsonify({"Error": error}),ERRO_JSON_SIZE






##
## -- LOGIN OU RECUPERCACAO
##

@app.post("/token/refresh")
@auth.Authentication(access=[Access.ALUNO,Access.ADMIN])
def refresh_token_auth(): 
    token = request.headers.get('Authorization')
    data = jwt.decode(token,os.environ["SECRET_KEY"],algorithms=['HS256'])

    newdata = refresh_token(data)

    return jsonify({'token': newdata})

@app.post("/pedido/recuperacao")
def pedido_recuperacao():
    if request.data:
        body = request.get_json()
    else:
        abort(ERRO_JSON_MISSING)

    result_status = ERRO_NAO_IMPLEMENTADO

    if result_status != 200:
        abort(result_status)

@app.route("/_cghpw<string:token>")
def pedido_recupercao_confirm(token):
    result_status = ERRO_NAO_IMPLEMENTADO

    if result_status != 200:
        abort(result_status)
    

@app.post("/login")
@CheckJson(properties = [("Nome",str,8),
                         ("Palavra-Passe",str,8)])
def login():

    body = request.get_json()

    result_status = 200

    #ERRO_AUTENTICACAO se nao encontrar utilizador


    token = jwt.encode({'userID' : 0,
                        'userName': 'ContaAluno',
                        'Access':Access.ADMIN,
                        'expiration': (datetime.datetime.utcnow() + datetime.timedelta(hours=1)).isoformat()},
                       os.environ["SECRET_KEY"])

    if result_status != 200:
        abort(result_status)

    return jsonify({'token': token})



    
@app.get("/logout")
@auth.Authentication(access=[Access.ALUNO,Access.ADMIN])
def logout():
    body = request.get_json()
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

@app.delete("/conta/remover")
@auth.Authentication(access=[Access.ADMIN])
@CheckJson(properties = [("ID_Conta",int)
                         ])
def remover_conta():
    body = request.get_json()
    result_status = 200
    if result_status != 200:
        abort(result_status)

    return "OK"#NOT IMPLEMENTED

@app.get("/conta/listar")
@auth.Authentication(access=[Access.ADMIN])
def lista_contas():
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.callproc("listarContas",(0,))

    for conta in cursor.fetchall():
        print(conta)
        
    return {"Contas":[{"ID_Conta":1,"Tipo_Conta":'Aluno',"Nome": 'Nome', "Email": 'email@email.com',"Palavra-Passe": 'FDA$#BDHSAI"#232',"estado": True,"acessibilidade": False}] }

@app.post("/conta/inserir")
@auth.Authentication(access=[Access.ADMIN])
@CheckJson(properties = [("Nome",str,8),
                         ("Email",str,3),
                         ("Palavra-Passe",str,8),
                         ("estado",bool),
                         ("acessibilidade",bool)
                         ])
def inserir_conta():

    body = request.get_json()


    result_status = ERRO_NAO_IMPLEMENTADO
    
    connection = getconnectionDB()
    cursor = connection.cursor() #Precisamos de saber o tipo de conta (Assumindo que este tipo de conta é de aluno)
    cursor.callproc("InserirConta",(body["Nome"],body["Email"],body["Palavra-Passe"],body["estado"],body["acessibilidade"]))
    

    
    if result_status != 200: #200 = OK
        abort(result_status)
        




@app.patch("/conta/editar")
@auth.Authentication(access=[Access.ALUNO,Access.ADMIN]) #Aluno pode editar sua própria password
@CheckJson(properties = [("Nome",str,8),
                         ("Email",str,3),
                         ("Palavra-Passe",str,8),
                         ("estado",bool),
                         ("acessibilidade",bool),
                         ("ID_Conta",int)
                         ])
def editar_conta():

    body = request.get_json()

      
    
    
    token = request.headers.get('Authorization')
    data = jwt.decode(token,os.environ["SECRET_KEY"],algorithms=['HS256'])

    if data["Access"] != Access.ADMIN: #Se nao for administrador, temos que saber se este é o proprio utilizador, ele pode editar --SÓ-- a sua password
        if data["userID"] != body["ID_Conta"]:
            abort(ERRO_ACESSO_NEGADO)

        connection = getconnectionDB()
        cursor = connection.cursor()
        cursor.callproc("EditarContaLite",(body["ID_Conta"],body["Acessibilidade"],body["Palavra-Passe"])) #Ideia de procedimento, nao podemos arriscar mudar a conta toda só para mudar estes 2 valores

        return "OK"

    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.callproc("EditarConta",(body["ID_Conta"],body["Nome"],body["Email"],body["Palavra-Passe"],body["estado"],body["acessibilidade"]))


    return "OK"





@app.patch("/conta/definir_ativo")
@auth.Authentication(access=[Access.ADMIN])
@CheckJson(properties = [("estado",bool),
                         ("ID_Conta",int)
                         ])
def definir_ativo_conta():

    body = request.get_json()

          
    result_status = ERRO_NAO_IMPLEMENTADO
    
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.callproc("AtivarDesativarConta",(body["ID_Conta"],body["estado"]))
    
    if result_status != 200:
        abort(result_status)

@app.get("/conta/detalhes")
@auth.Authentication(access=[Access.ALUNO,Access.ADMIN])
def detalhes_conta():
    token = request.headers.get('Authorization')
    data = jwt.decode(token,os.environ["SECRET_KEY"],algorithms=['HS256'])
    return data



##
## --
##


##
## -- Gestao Eleicoes
##
@app.get("/eleicao/listar")
@auth.Authentication(access=[Access.ALUNO,Access.ADMIN])
def lista_eleicao():
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.callproc("ListarEleicoes")

    for eleicao in cursor.fetchall():
        print(eleicao)

    
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

@app.post("/eleicao/votar")
@auth.Authentication(access=[Access.ALUNO])
@CheckJson(properties = [("ID_Eleicao",int),
                         ("ID_Candidato",int)
                         ])
def votar_eleicao():

    body = request.get_json()

     
    token = request.headers.get('Authorization')
    data = jwt.decode(token,os.environ["SECRET_KEY"],algorithms=['HS256'])
    userID = int(data["userID"])

    #Por alguma razao na procedure de votar já temos os checks lá dentro, entao nao preciso de me preocupar com verificações, só se SUCCESS = TRUE/FALSE

    result_status = ERRO_NAO_IMPLEMENTADO
    
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.callproc("votar",(0,userID,body["ID_Eleicao"],body["ID_Candidato"]))

    print(cursor.fetchone())
    
    if result_status != 200:
        abort(result_status)
        


@app.post("/eleicao/criar")
@auth.Authentication(access=[Access.ADMIN])
@CheckJson(properties = [("Nome",str,5),
                         ("Data_Inicio",str),
                         ("Descricao",str),
                         ("Cargo_Disputa",str,2)
                         ])
def criar_eleicao():
    

    body = request.get_json()

        
    result_status = ERRO_NAO_IMPLEMENTADO
    
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.callproc("criacaoEleicao",(0,body["Nome"],body["Data_Inicio"],body["Descricao"],body["Cargo_Disputa"])) #Falta a data_fim
    
    if result_status != 200:
        abort(result_status)
        


@app.patch("/eleicao/editar")
@auth.Authentication(access=[Access.ADMIN])
@CheckJson(properties = [("ID_Eleicao",int),
                         ("Nome",str,5),
                         ("Data_Inicio",str),
                         ("Descricao",str),
                         ("Cargo_Disputa",str,2)
                         ])
def editar_eleicao():

    body = request.get_json()


    result_status = ERRO_NAO_IMPLEMENTADO
    
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.callproc("editarEleicao",(0,body["ID_Eleicao"],body["Nome"],body["Data_Inicio"],body["Descricao"],body["Cargo_Disputa"]))
    
    if result_status != 200:
        abort(result_status)




@app.post("/eleicao/adicionar_candidato")
@auth.Authentication(access=[Access.ADMIN])
@CheckJson(properties = [("ID_Lista_Candidatos",int),
                         ("ID_Candidato",int)
                         ])
def adicionar_candidato_eleicao():
    if request.data:
        body = request.get_json()
    else:
        abort(ERRO_JSON_MISSING)

    result_status = ERRO_NAO_IMPLEMENTADO
   
    
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.callproc("inserirCandidato",(body["ID_Lista_Candidatos"],body["ID_Candidato"]))
    #ID_Lista_Candidatos poderia ser o mesmo que o ID da eleicao para simplificar
    
    if result_status != 200:
        abort(result_status)
    



##
## --
##


@app.get("/candidato/listar")
@auth.Authentication(access=[Access.ALUNO,Access.ADMIN])
def listar_candidato():    
    
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.callproc("listarGestorCandidatos") #Precisamos de saber quantos gestores candidatos existem
    
    
    
    Ids_Listas = [0,1,2,4]

    #TODO <- Mudar isto, talvez criar multiplas conexões com a base de dados é degradante para a API, talvez o que queremos é listar candidatos de um gestor só
    #Se fizermos isto preciso entao de fazer outro endpoint que devolve os IDs da lista de candidatos para depois podermos selecionar este

    for _id in Ids_Listas:
        cursor = connection.cursor()
        cursor.callproc("listarCandidatos",(_id,)) #Buscar os candidatos de cada gestor de candidatos diferente

        for item in cursor.fetchall():
            print(item)

        
    
     
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
            

@app.post("/candidato/inserir")
@auth.Authentication(access=[Access.ADMIN])
@CheckJson(properties = [("ID_Lista_Candidatos",int)
                         ])
def inserir_candidato():

    body = request.get_json()

       
        
    result_status = 200
    
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.callproc("inserirCandidato",(body["ID_Lista_Candidatos"],))
    #Nao existe prcedimento para inserir um novo candidato, isto só faz a associacao a um GestorCandidatos
    
    if result_status != 200:
        abort(result_status)
        
    
    

    return "OK" #NOT IMPLEMENTED

@app.patch("/candidato/editar")
@auth.Authentication(access=[Access.ADMIN])
@CheckJson(properties = [("ID_Candidato",int),
                         ("Nome",str,5),
                         ("Tipo",str,2),
                         ("Votos",int)
                         ])
def editar_candidato(): #Agora que percebi que estamos literalmente a dar uma backdoor para editar votos... nao sei se isto seria uma boa ideia de implementar assim

    body = request.get_json()



    result_status = 200
    


    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.callproc("EditarCandidato",(body["ID_Candidato"],body["Nome"],body["Tipo"],body["Votos"]))
    


    if result_status != 200:
        abort(result_status)
    
            

    return "OK" #NOT IMPLEMENTED

@app.delete("/candidato/remover")
@auth.Authentication(access=[Access.ADMIN])
@CheckJson(properties = [("ID_Lista_Candidatos",int),
                         ("ID_Candidato",int)
                         ])
def remover_candidato():

    body = request.get_json()



    result_status = ERRO_NAO_IMPLEMENTADO
    
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.callproc("removeCandidato",(body["ID_Lista_Candidatos"],body["ID_Candidato"]))
    #Isto só remove a associacao de um candidato para o seu gestor, ela nao apaga mesmo da base de dados

    if result_status != 200:
        abort(result_status)


@app.get("/evento/listar")
@auth.Authentication(access=[Access.ALUNO,Access.ADMIN])
def listar_evento():
    
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.callproc("listarEventos",(0,))
    #Nao existe uma procedure para listar eventos

    for evento in cursor.fetchall():
        print(evento)
    
    return {"Eventos":[{
            "ID_Evento":0,
            "Nome":'Nome',
            "Descricao":'Desc',
            "Data":'12/12/2023',
            "Responsavel": 'Respons'
    }
        ]}

@app.post("/evento/inserir")
@auth.Authentication(access=[Access.ADMIN])
@CheckJson(properties = [("ID_Evento",int)
                         ])
def inserir_evento():

    body = request.get_json()
        
    result_status = ERRO_NAO_IMPLEMENTADO
    
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.callproc("inserirEvento",(0,body["ID_Evento"]))
    #Isto nao insere um evento, so faz a associacao a um GestorEvento

    if result_status != 200:
        abort(result_status)



@app.route("/test")
def test():
    return "OK"




if __name__ == '__main__':
    app.run(debug=False)