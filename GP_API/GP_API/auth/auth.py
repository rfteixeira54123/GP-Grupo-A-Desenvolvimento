from enum import Enum
from http.client import ACCEPTED
from os import abort
from flask import request
from dataclasses import dataclass
from functools import wraps

class Access(Enum):
    ADMIN = 1 #Acesso a administradores
    ALUNO = 2 #Acesso a alunos

@dataclass
class AuthError(Exception):
    error: str
    def __init__(self,message):
        super().__init__(message)
        self.error = message
    def __str__(self):
        return str(self.args[0])

def has_acess(token,access):
    if token == None and access == None:
        return 0

    if token == None:
        return 1

    if not (token == "Token_Aluno" or token == "Token_Admin"): #O token dado e valido?
        return 2

    if access == None:
        return 0

    #WE HAVE TO KNOW WICH TYPE OF ACCOUNT THIS IS FIRST
    accounttype = -1 #<- TYPE OF ACCOUNT IS STORED HERE!
    if token == "Token_Aluno":
        accounttype = Access.ALUNO
    elif token == "Token_Admin":
        accounttype = Access.ADMIN
    
    
    return (0 if accounttype == access else 3)

def error_type(num):
    if num == 1:
        return "Um token (Authorization) nÃ£o foi dado num endpoint com restriÃ§Ã£o de acesso"
    if num == 2:
        return "Token disponibilizado nÃ£o Ã© vÃ¡lido"
    if num == 3:
        return "Accesso negado"

    return "Erro desconhecido"
        

def Authentication(access = None):
    def Authentication_Function(func):
        @wraps(func)
        def Authentication_Wrapper(*args, **kwargs):
            try:
                token = request.headers.get('Authorization') #Buscar token se este existir
            except:
                token = None

            anyaccess = 3 #Erro default sera "Acesso negado"

            if access != None: 
                result = []
                for ac in access:
                    result.append(has_acess(token,ac))

                if 0 in result:
                    anyaccess = 0
                else:
                    anyaccess = result[0]
            else:
                anyaccess = has_acess(token,access) #Se nao houver nenhum tipo de acesso especifico o token pode ser ainda usado para verificar se o utilizador Ã© valido

            if anyaccess != 0:
                raise AuthError(error_type(anyaccess)) 
            val = func(*args, **kwargs)
            return val

        return Authentication_Wrapper
    return Authentication_Function

