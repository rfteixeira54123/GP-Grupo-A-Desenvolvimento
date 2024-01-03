import json
from sqlite3 import connect
#import oracledb
import mysql.connector
from flask import Flask,request,jsonify,abort
from flask_cors import CORS
import auth.auth as auth
from auth.auth import Access
from auth.auth import AuthError
import os
from dataclasses import dataclass

app = Flask(__name__)
'''
try:
    oracledb.init_oracle_client(lib_dir=os.getcwd() + "/instantclient_21_12")
except Exception as e:
    print(e)
    print("Oracle client not found")
    if oracledb.is_thin_mode():
    print("Oracle running in thin mode")
else:
    print("Oracle running in thick mode")
    
'''
CORS(app)







def getconnectionDB():
    connection = mysql.connector.connect(host="2001:8a0:fecf:3700:11d9:662c:79ad:8234",
                                         user="root", 
                                         password="estgoh")
    return connection

#getconnectionDB().close()


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

@dataclass
class JSONPropError(Exception):
    error: str
    def __init__(self,message):
        super().__init__(message)
        self.error = "'" + message + "' propriedade em falta no JSON"
    def __str__(self):
        return str(self.error)
    
@app.errorhandler(JSONPropError)
def error_handler(error):
    return jsonify({"Error": error}),422



##
## -- LOGIN OU RECUPERCACAO
##
@app.post("/pedido/recuperacao")
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
    

@app.post("/login")
def login():
    if request.data:
        body = request.get_json()
    else:
        abort(422)
    result_status = 501
    if result_status != 200:
        abort(result_status)


    
@app.get("/logout")
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

@app.delete("/conta/remover")
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

@app.get("/conta/listar")
@auth.Authentication(access=[Access.ADMIN])
def lista_contas():
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.callproc("listarContas",(0,))
    
    for row in cursor.stored_results():
        print(row.fetchall())
        
    return {"Contas":[{"ID_Conta":1,"Tipo_Conta":'Aluno',"Nome": 'Nome', "Email": 'email@email.com',"Palavra-Passe": 'FDA$#BDHSAI"#232',"estado": True,"acessibilidade": False}] }

@app.post("/conta/inserir")
@auth.Authentication(access=[Access.ADMIN])
def inserir_conta():
    if request.data:
        body = request.get_json()
    else:
        abort(422)
   
    keys = ["Nome","Email","Palavra-Passe","estado","acessibilidade"]
    for key in keys:
        if key not in body:
            raise JSONPropError(key)

            
        
    
    result_status = 501
    
    connection = getconnectionDB()
    cursor = connection.cursor() #Precisamos de saber o tipo de conta! (Assumindo que este tipo de conta é de aluno)
    cursor.callproc("InserirConta",(body["Nome"],body["Email"],body["Palavra-Passe"],body["estado"],body["acessibilidade"]))
    

    
    if result_status != 200: #200 = OK
        abort(result_status)
        




@app.patch("/conta/editar")
@auth.Authentication(access=[Access.ALUNO,Access.ADMIN]) #Aluno pode editar sua própria password
def editar_conta():
    if request.data:
        body = request.get_json()
    else:
        abort(422)
        
    keys = ["ID_Conta","Nome","Email","Palavra-Passe","estado","acessibilidade"]
    for key in keys:
        if key not in body:
            raise JSONPropError(key)
        
    result_status = 501
  
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.callproc("EditarConta",(body["ID_Conta"],body["Nome"],body["Email"],body["Palavra-Passe"],body["estado"],body["acessibilidade"]))
    
    if result_status != 200:
        abort(result_status)





@app.patch("/conta/definir_ativo")
@auth.Authentication(access=[Access.ADMIN])
def definir_ativo_conta():
    if request.data:
        body = request.get_json()
    else:
        abort(422)
        
    keys = ["ID_Conta","estado"]
    for key in keys:
        if key not in body:
            raise JSONPropError(key)
        
    result_status = 501
    
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.callproc("AtivarDesativarConta",(body["ID_Conta"],body["estado"]))
    
    if result_status != 200:
        abort(result_status)



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
def votar_eleicao():
    if request.data:
        body = request.get_json()
    else:
        abort(422)

    result_status = 501
    
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.callproc("listarContas",(0,))#Nao ha procedure para votar
    
    if result_status != 200:
        abort(result_status)
        


@app.post("/eleicao/criar")
@auth.Authentication(access=[Access.ADMIN])
def criar_eleicao():
    
    if request.data:
        body = request.get_json()
    else:
        abort(422)

    result_status = 501
    
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.callproc("listarContas",(0,)) #Nao ha procedure para criar eleicao
    
    if result_status != 200:
        abort(result_status)
        


@app.patch("/eleicao/editar")
@auth.Authentication(access=[Access.ADMIN])
def editar_eleicao():
    if request.data:
        body = request.get_json()
    else:
        abort(422)

    result_status = 501
    
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.callproc("listarContas",(0,)) #Nao ha procedure para editar eleicao
    
    if result_status != 200:
        abort(result_status)




@app.post("/eleicao/adicionar_candidato")
@auth.Authentication(access=[Access.ADMIN])
def adicionar_candidato_eleicao():
    if request.data:
        body = request.get_json()
    else:
        abort(422)

    result_status = 501
    
    keys = ["ID_Lista_Candidatos","ID_Candidato"]
    for key in keys:
        if key not in body:
            raise JSONPropError(key)
    
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.callproc("inserirCandidato",(body["ID_Lista_Candidatos"],body["ID_Candidato"])) #ID_Lista_Candidatos poderia ser o mesmo que o ID da eleicao para simplificar
    
    if result_status != 200:
        abort(result_status)
    



##
## --
##


@app.get("/candidato/listar")
@auth.Authentication(access=[Access.ALUNO,Access.ADMIN])
def listar_candidato():
    if request.data:
        body = request.get_json()
    else:
        abort(422)
        
    
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.callproc("listarGestorCandidatos") #Precisamos de saber quantos gestores candidatos existem
    
    
    
    Ids_Listas = [0,1,2,4]
    cursor.close()
    
    for _id in Ids_Listas:
        cursor = connection.cursor()
        cursor.callproc("listarCandidatos",(_id,)) #Buscar os candidatos de cada gestor de candidatos diferente
        
    
     
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
            

@app.post("/candidato/inserir")
@auth.Authentication(access=[Access.ADMIN])
def inserir_candidato():
    if request.data:
        body = request.get_json()
    else:
        abort(422)
        

    keys = ["ID_Lista_Candidatos"]
    for key in keys:
        if key not in body:
            raise JSONPropError(key)
        
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
def editar_candidato():
    if request.data:
        body = request.get_json()
    else:
        abort(422)
        
    keys = ["ID_Candidato","Nome","Tipo","Votos"]
    for key in keys:
        if key not in body:
            raise JSONPropError(key)


    result_status = 200
    


    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.callproc("EditarCandidato",(body["ID_Candidato"],body["Nome"],body["Tipo"],body["Votos"]))
    


    if result_status != 200:
        abort(result_status)
    
            

    return "OK" #NOT IMPLEMENTED

@app.delete("/candidato/remover")
@auth.Authentication(access=[Access.ADMIN])
def remover_candidato():
    if request.data:
        body = request.get_json()
    else:
        abort(422)
        
    keys = ["ID_Lista_Candidatos","ID_Candidato"]
    for key in keys:
        if key not in body:
            raise JSONPropError(key)

    result_status = 501
    
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.callproc("removeCandidato",(body["ID_Lista_Candidatos"],body["ID_Candidato"]))
    #Isto só remove a associacao de um candidato para o seu gestor, ela nao apaga mesmo

    if result_status != 200:
        abort(result_status)


@app.get("/evento/listar")
@auth.Authentication(access=[Access.ALUNO,Access.ADMIN])
def listar_evento():
    
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.callproc("listarContas",(0,))
    #Nao existe uma procedure para listar eventos
    
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
def inserir_evento():
    if request.data:
        body = request.get_json()
    else:
        abort(422)
        
    keys = ["ID_Gestor","ID_Evento"]
    for key in keys:
        if key not in body:
            raise JSONPropError(key)
    
    result_status = 501
    
    connection = getconnectionDB()
    cursor = connection.cursor()
    cursor.callproc("inserirEvento",(body["ID_Gestor"],body["ID_Evento"]))
    #Isto nao insere um evento, so faz a associacao a um GestorEvento

    if result_status != 200:
        abort(result_status)



@app.route("/test")
def test():
    return "OK"




if __name__ == '__main__':
    app.run(debug=False)