from dataclasses import dataclass
from enum import IntEnum,auto


ERRO_INTERNO = 500 #Erro cometido quando um erro interno acontece, normalmente não é culpa de quem fez o pedido API, estes erros devem ser comunicados com o programador
ERRO_NAO_IMPLEMENTADO = 501 #Endpoint nao implementado
ERRO_CONTENT_TYPE = 415 #Header content-type nao foi configurado corretamente
ERRO_JSON_MISSING = 422 #Um corpo JSON foi esperado mas nenhum foi disponibilizado
ERRO_AUTENTICACAO = 401 #A Autenticacao Falhou
ERRO_JSON_PROPERTY = 423 #Uma propriedade do JSON está em falta
ERRO_JSON_TYPE = 424 #Uma propriedade tem um tipo inesperado
ERRO_JSON_SIZE = 425 #Uma propriedade nao segue um tamanho minimo esperado (habitual para alguma propriedade do tipo string)
ERRO_ACESSO_NEGADO = 405 #Embora exista autenticacao, o utilizador nao tem acesso a esta funcionalidade
ERRO_AUTENTICACAO_INVALIDA = 400 #O token é inválido
ERRO_AUTENTICACAO_FALTA = 412 #Nenhum token foi dado num endpoint onde é preciso token
ERRO_AUTENTICACAO_EXPIRE = 403 #O token expirou

@dataclass
class Access(IntEnum):
    ADMIN: int = auto() #Acesso a administradores
    ALUNO: int = auto() #Acesso a alunos

@dataclass
class JSONPropError(Exception):
    error: str
    def __init__(self,message):
        super().__init__(message)
        self.error = "'" + message + "' propriedade em falta no JSON ou valor NULL"
    def __str__(self):
        return str(self.error)

@dataclass
class JSONTypeError(Exception):
    error: str
    def __init__(self,typeof,key):
        super().__init__(typeof)
        self.error = "Tipo de propriedade '" + key + "' inválida, " + str(typeof) + " esperado"
    def __str__(self):
        return str(self.error)

@dataclass
class JSONSizeError(Exception):
    error: str
    def __init__(self,key,size):
        super().__init__(key)
        self.error = "Propriedade '" + key + "' nao tem o tamanho minimo de " + str(size)
    def __str__(self):
        return str(self.error)
