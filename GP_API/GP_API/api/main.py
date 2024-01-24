import json
from errors.errors import *
import psycopg2
from psycopg2.extras import RealDictCursor
from flask import Flask,request,jsonify,abort
from flask_cors import CORS
import auth.auth as auth
from auth.auth import refresh_token, error_type,acess_type
import os
from dataclasses import dataclass
import jwt
import datetime
from jsoncheck.json_checker import CheckJson





app = Flask(__name__)
'''
TODO
Listar TODOS os candidatos
Implementacao Base de dados
Testar com dados de teste

--OPTIONAL--
BlackList de Tokens (Anular sessÃµes de tokens com uma lista de tokens invalidos)
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

@app.errorhandler(InputError)
def error_common(error):
    return jsonify({"Error": error}), ERRO_INSERIR_DADOS

@app.errorhandler(ERRO_INTERNO)
def error_501(error):
    return jsonify({"Error":'Erro de servidor Interno'}),ERRO_INTERNO

@app.errorhandler(ERRO_NAO_IMPLEMENTADO)
def error_500(error):
    return jsonify({"Error":'Endpoint nÃÂ£o implementado'}),ERRO_NAO_IMPLEMENTADO

@app.errorhandler(ERRO_CONTENT_TYPE)
def error_415(error):
    return jsonify({"Error":"Content-type nÃÂ£o definido para 'application/json'. A ignorar pedido"}),ERRO_CONTENT_TYPE

@app.errorhandler(JSONMissing)
def error_422(error):
    return jsonify({"Error": error}),ERRO_JSON_MISSING

@app.errorhandler(AuthMissing)
def error_no_token(error):
    return jsonify({"Error": error}),ERRO_AUTENTICACAO_FALTA

@app.errorhandler(AuthCred)
def error_hanlder(error):
    return jsonify({"Error": error}),ERRO_AUTENTICACAO

@app.errorhandler(AuthInvalid)
def erro_autenticacao_invalida(error):
    return jsonify({"Error": error}),ERRO_AUTENTICACAO_INVALIDA

@app.errorhandler(AuthExpire)
def erro_autenticacao_invalida(error):
    return jsonify({"Error": error}),ERRO_AUTENTICACAO_EXPIRE

@app.errorhandler(AuthDenied)
def erro_autenticacao_denied(error):
    return jsonify({"Error": error}),ERRO_ACESSO_NEGADO
    
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
        raise JSONMissing()

    result_status = ERRO_NAO_IMPLEMENTADO

    if result_status != 200:
        abort(result_status)

@app.route("/_cghpw<string:token>")
def pedido_recupercao_confirm(token):
    result_status = ERRO_NAO_IMPLEMENTADO

    if result_status != 200:
        abort(result_status)
    

@app.post("/login")
@CheckJson(properties = [("Email",str,8),
                         ("PalavraPasse",str,8)])
def login():

    body = request.get_json()

    result_status = 200

    #ERRO_AUTENTICACAO se nao encontrar utilizador

    conn = getconnectionDB()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM encontrar_conta_por_email_e_password(%s,%s)",(body["Email"],body["PalavraPasse"]))

    try:
        result = cursor.fetchall()[0]
    except:
        cursor.close()
        conn.close()
        raise AuthCred()

    tipoconta = acess_type(result['tipo'])
    identificador = result['num_identificacao']

    if identificador == None:
        identificador = 0

    token = jwt.encode({'userID' : result['id_conta'],
                        'Identificador' : identificador,
                        'userName': result['nome'],
                        'acessibilidade': result['acessibilidade'],
                        'Access':tipoconta,
                        'expiration': (datetime.datetime.utcnow() + datetime.timedelta(hours=1)).isoformat()},
                       os.environ["SECRET_KEY"])
    
    cursor.close()
    conn.close()
    
    if result_status != 200:
        abort(result_status)

    return jsonify({'token': token})



    
@app.get("/logout")
@auth.Authentication(access=[Access.ALUNO,Access.ADMIN])
def logout():
    result_status = 200
    if result_status != 200:
        abort(result_status)

    return jsonify("OK"), result_status #NOT IMPLEMENTED

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

    conn = getconnectionDB()
    cursor = conn.cursor()
    #cursor.execute("SELECT")

    conn.commit()
    cursor.close()
    conn.close()
    result_status = 200
    if result_status != 200:
        abort(result_status)

    abort(ERRO_NAO_IMPLEMENTADO)#NOT IMPLEMENTED




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
                         ("PalavraPasse",str,8),
                         ("Identificacao",int),
                         ("estado",bool),
                         ("acessibilidade",bool),
                         ("TipoConta",str)
                         ])
def inserir_conta():

    body = request.get_json()
    
    if body["TipoConta"] != "Administrador" and body["TipoConta"] != "Aluno":
        raise InputError("Tipo de conta invalido")
        
        
    
    connection = getconnectionDB()
    cursor = connection.cursor(cursor_factory=RealDictCursor) #Precisamos de saber o tipo de conta (Assumindo que este tipo de conta Ã© de aluno)
    cursor.execute("SELECT * FROM inserir_utilizador(%s,%s,%s,%s,%s,%s,%s)",(body["Nome"],body["Email"],body["PalavraPasse"],body["Identificacao"],body["estado"],body["acessibilidade"],body["TipoConta"]))
    result = cursor.fetchall()[0]['inserir_utilizador']
    
    connection.commit()
    cursor.close()
    connection.close()

    
    if result == True:
        return "OK"
    else:
        raise InputError("Erro ao inserir conta")
    
        




@app.patch("/conta/editar")
@auth.Authentication(access=[Access.ALUNO,Access.ADMIN]) #Aluno pode editar sua prÃ³pria password
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

    if data["Access"] != Access.ADMIN: #Se nao for administrador, temos que saber se este Ã© o proprio utilizador, ele pode editar --SÃ-- a sua password
        if data["userID"] != body["ID_Conta"]:
            raise AuthDenied()

        connection = getconnectionDB()
        cursor = connection.cursor()
        cursor.callproc("EditarContaLite",(body["ID_Conta"],body["Acessibilidade"],body["Palavra-Passe"])) #Ideia de procedimento, nao podemos arriscar mudar a conta toda sÃ³ para mudar estes 2 valores

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
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM listar_eleicoes()")
    result = {"Eleicoes": []}
    for eleicao in cursor.fetchall():
        result["Eleicoes"].append(eleicao)
        '''
        result["Eleicoes"].append(
            {
            "ID_Eleicao": eleicao["id_eleicao"],
            "Nome": eleicao["nome"],
            "Data_Inicio" : eleicao["data_inicio"].strftime("%Y-%m-%d"),
            "Data_Fim" : eleicao["data_fim"].strftime("%Y-%m-%d"),
            "Descricao" : eleicao["descricao"],
            "Cargo_Disputa": eleicao["cargo_disputa"],
            "Estado": eleicao["estado"]
            }) 
        50% mais rapido sem isto
        '''
        

    
    return result

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

    
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM votar(%s,%s,%s)",(body["ID_Eleicao"],userID,body["ID_Candidato"]))

    connection.commit()
    if cursor.fetchall()[0][0] != True:
        cursor.close()
        connection.close()

        raise InputError("Erro ao votar")

    
    return jsonify("OK"),200
        


@app.post("/eleicao/inserir")
@auth.Authentication(access=[Access.ADMIN])
@CheckJson(properties = [("Nome",str,5),
                         ("Data_Inicio",str),
                         ("Data_Fim",str),
                         ("Cargo_Disputa",str,2)
                         ])
def inserir_eleicao():
    

    body = request.get_json()

        
    result_status = 200


    data_inicio = body["Data_Inicio"]
    data_fim = body["Data_Fim"]

    try:
        data_inicio = datetime.datetime.strptime(data_inicio,"%Y-%m-%d")
        data_fim = datetime.datetime.strptime(data_fim,"%Y-%m-%d")
    except:
        raise InputError("Datas InvÃ¡lidas, formato deve ser o seguinte: YYYY-MM-DD")

    if data_inicio > data_fim:
        raise InputError("Data de inicio Ã© maior que a data de fim")

    data_inicio = data_inicio.strftime("%Y-%m-%d")
    data_fim = data_fim.strftime("%Y-%m-%d")

    
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM inserir_eleicao(%s,%s,%s,%s,%s)",(body["Nome"],data_inicio,data_fim," ",body["Cargo_Disputa"]))
    connection.commit()
    if cursor.fetchall()[0][0] == False:
        
        cursor.close()
        connection.close()
        raise InputError("Erro ao adicionar eleicao")

    cursor.close()
    connection.close()

    
    if result_status != 200:
        abort(result_status)

    return jsonify("OK"),200
        


@app.patch("/eleicao/editar")
@auth.Authentication(access=[Access.ADMIN])
@CheckJson(properties = [("ID_Eleicao",int),
                         ("Nome",str,5),
                         ("Data_Inicio",str),
                         ("Data_Fim",str),
                         ("Cargo_Disputa",str,2)
                         ])
def editar_eleicao():

    body = request.get_json()
    
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM editar_eleicao(%s,%s,%s,%s,%s,%s)",(body["ID_Eleicao"],body["Nome"],body["Data_Inicio"],body["Data_Fim"],"",body["Cargo_Disputa"]))

    if cursor.fetchall()[0][0] != True:
        cursor.close()
        connection.close()
        raise InputError("Erro ao editar eleicao")
    connection.commit()
    cursor.close()
    connection.close()


    return jsonify("OK"), 200




@app.post("/eleicao/adicionar_candidato")
@auth.Authentication(access=[Access.ADMIN])
@CheckJson(properties = [("ID_Eleicao",int),
                         ("ID_Candidato",int)
                         ])
def adicionar_candidato_eleicao():

    body = request.get_json()
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM adicionar_candidato(%s,%s)",(body["ID_Eleicao"],body["ID_Candidato"]))
    #ID_Lista_Candidatos poderia ser o mesmo que o ID da eleicao para simplificar
    connection.commit()
    if cursor.fetchall()[0][0] == False:
        cursor.close()
        connection.close()
        raise InputError("Erro ao adicionar candidato na Eleicao")
    cursor.close()
    connection.close()
    return jsonify("OK"),200

    

@app.get("/eleicao<int:id_eleicao>/listar_candidatos")    
@auth.Authentication(access=[Access.ADMIN,Access.ALUNO])
def listar_candidatos_eleicao(id_eleicao):
    connection = getconnectionDB()
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    
    cursor.execute("SELECT * FROM listar_candidatos_eleicao(%s)",(id_eleicao,))
    result = {"Candidatos" : []}
    for item in cursor.fetchall():
        result["Candidatos"].append(item)

    cursor.close()
    connection.close()
    
     
    return result


##
## --
##

##
## CANDIDATOS
##

@app.get("/candidato/listar")
@auth.Authentication(access=[Access.ALUNO,Access.ADMIN])
def listar_candidato():    
    connection = getconnectionDB()
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    
    cursor.execute("SELECT * FROM listar_candidatos()")
    result = {"Candidatos" : []}
    for item in cursor.fetchall():
        result["Candidatos"].append(item)

    cursor.close()
    connection.close()
    
     
    return result
            
@app.post("/candidato/inserir")
@auth.Authentication(access=[Access.ADMIN])
@CheckJson(properties = [("Nome",str),
                         ("Tipo",str),
                         ("Objetivo",str),
                         ("Link_Imagem",str)
                         ])
def inserir_candidato():

    body = request.get_json()

       
        
    result_status = 200
    
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM inserir_candidato(%s,%s,%s,%s)",(body["Nome"],body["Tipo"],body["Objetivo"],body["Link_Imagem"]))
    connection.commit()

    if cursor.fetchall()[0][0] == False:
        cursor.close()
        connection.close()
        raise InputError("Erro ao adicionar Candidato")
    cursor.close()
    connection.close()
    
    return jsonify("OK"),200



@app.patch("/candidato/editar")
@auth.Authentication(access=[Access.ADMIN])
@CheckJson(properties = [("ID_Candidato",int),
                         ("Nome",str),
                         ("Tipo",str),
                         ("Objetivo",str),
                         ("Link_Imagem",str)
                         ])
def editar_candidato():

    body = request.get_json()

    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.execute("CALL editar_candidato(%s,%s,%s,%s,%s)",(body["ID_Candidato"],body["Nome"],body["Tipo"],body["Objetivo"],body["Link_Imagem"]))
    connection.commit()
    cursor.close()
    connection.close()

    return jsonify("OK"),200

@app.delete("/candidato/remover")
@auth.Authentication(access=[Access.ADMIN])
@CheckJson(properties = [("ID_Eleicao",int),
                         ("ID_Candidato",int)
                         ])
def remover_candidato():

    body = request.get_json()



    result_status = ERRO_NAO_IMPLEMENTADO
    
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.execute("removeCandidato",(body["ID_Lista_Candidatos"],body["ID_Candidato"]))
    #Isto sÃ³ remove a associacao de um candidato para o seu gestor, ela nao apaga mesmo da base de dados

    if result_status != 200:
        abort(result_status)


##
## --
##

##
## EVENTOS 
## 
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


##
## --
##

@app.route("/test")
def test():
    return "OK"




if __name__ == '__main__':
    app.run(debug=False)
