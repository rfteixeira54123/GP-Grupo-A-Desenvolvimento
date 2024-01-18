import os
from flask import request, abort
import jwt
from functools import wraps
from dotenv import load_dotenv
import datetime
from errors import *
load_dotenv()

SECRET_KEY = os.environ["SECRET_KEY"]

def has_acess(data,access):
    if data == None or access == None:
        return 0

    if data == None:
        return 1



    #WE HAVE TO KNOW WICH TYPE OF ACCOUNT THIS IS FIRST
    accounttype = data['Access'] #<- TYPE OF ACCOUNT IS STORED HERE!
    
    return (0 if accounttype == access else 3)

def error_type(num):
    if num == 1:
        return "Um token (Authorization) nÃ£o foi dado num endpoint com restriÃ§Ã£o de acesso"
    if num == 2:
        return "Token disponibilizado nÃ£o Ã© vÃ¡lido"
    if num == 4:
        return "Token Expirado"

    return "Erro desconhecido"

def refresh_token(data):

    newtoken = jwt.encode({'userID' : data['userID'],
                           'userName': data['userName'],
                           'Access': data['Access'],
                           'expiration': (datetime.datetime.utcnow() + datetime.timedelta(hours=1)).isoformat()},
                          os.environ["SECRET_KEY"])
    return newtoken
        

def Authentication(access = None):
    def Authentication_Function(func):
        @wraps(func)
        def Authentication_Wrapper(*args, **kwargs):
            try:
                token = request.headers.get('Authorization') #Buscar token se este existir
            except:
                abort(ERRO_AUTENTICACAO_FALTA)
            if token == None:
                abort(ERRO_AUTENTICACAO_FALTA)
            try:
                data = jwt.decode(token,os.environ["SECRET_KEY"],algorithms=['HS256'])
            except:
                abort(ERRO_AUTENTICACAO_INVALIDA)

            #Verificar se expirou
            expiration_time = datetime.datetime.strptime(data["expiration"], "%Y-%m-%dT%H:%M:%S.%f")
            if datetime.datetime.now() > expiration_time:
                abort(ERRO_AUTENTICACAO_EXPIRE)

            anyaccess = 3 #Erro default sera "Acesso negado"

            if access != None: 
                result = []
                for ac in access:
                    result.append(has_acess(data,ac))

                if 0 in result:
                    anyaccess = 0
                else:
                    anyaccess = result[0]
            else:
                anyaccess = has_acess(data,access) #Se nao houver nenhum tipo de acesso especifico o token pode ser ainda usado para verificar se o utilizador Ã© valido
            
            
            if anyaccess != 0:
                abort(ERRO_ACESSO_NEGADO) 

            val = func(*args, **kwargs)
            return val

        return Authentication_Wrapper
    return Authentication_Function

