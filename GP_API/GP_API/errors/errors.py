from dataclasses import dataclass
from enum import IntEnum,auto


ERRO_INTERNO = 500 #Erro cometido quando um erro interno acontece, normalmente não é culpa de quem fez o pedido API, estes erros devem ser comunicados com o programador
ERRO_NAO_IMPLEMENTADO = 501 #Endpoint nao implementado
ERRO_CONTENT_TYPE = 415 #Header content-type nao foi configurado corretamente

ERRO_JSON_MISSING = 422 #Um corpo JSON foi esperado mas nenhum foi disponibilizado
ERRO_JSON_PROPERTY = 422 #Uma propriedade do JSON está em falta
ERRO_JSON_TYPE = 422 #Uma propriedade tem um tipo inesperado
ERRO_JSON_SIZE = 422 #Uma propriedade nao segue um tamanho minimo esperado (habitual para alguma propriedade do tipo string)

ERRO_ACESSO_NEGADO = 403 #Embora exista autenticacao, o utilizador nao tem acesso a esta funcionalidade
ERRO_AUTENTICACAO_INVALIDA = 403 #O token é inválido
ERRO_AUTENTICACAO_EXPIRE = 403 #O token expirou

ERRO_AUTENTICACAO = 401 #A Autenticacao Falhou
ERRO_AUTENTICACAO_FALTA = 401 #Nenhum token foi dado num endpoint onde é preciso token

ERRO_INSERIR_DADOS = 400 #Erro comum ao inserir dados

@dataclass
class Access(IntEnum):
    ADMIN: int = auto() #Acesso a administradores
    ALUNO: int = auto() #Acesso a alunos


@dataclass
class InputError(Exception):
    error: str
    def __init__(self,message):
        super().__init__(message)
        self.error = message
    def __str__(self):
        return str(self.error)
@dataclass
class AuthDenied(Exception):
    '''ERRO_ACESSO_NEGADO'''
    error: str
    def __init__(self):
        self.error = "Acesso negado"
        super().__init__(self.error)
        
    def __str__(self):
        return str(self.error)      

@dataclass
class JSONMissing(Exception):
    '''ERRO_JSON_MISSING'''
    error: str
    def __init__(self):
        self.error = "JSON em falta"
        super().__init__(self.error)
    def __str__(self):
        return str(self.error)    
@dataclass
class JSONPropError(Exception):
    '''ERRO_JSON_PROPERTY'''
    error: str
    def __init__(self,message):
        super().__init__(message)
        self.error = "'" + message + "' propriedade em falta no JSON ou valor NULL"
    def __str__(self):
        return str(self.error)

@dataclass
class JSONTypeError(Exception):
    '''ERRO_JSON_TYPE'''
    error: str
    def __init__(self,typeof,key):
        super().__init__(typeof)
        self.error = "Tipo de propriedade '" + key + "' inválida, " + str(typeof) + " esperado"
    def __str__(self):
        return str(self.error)

@dataclass
class JSONSizeError(Exception):
    '''ERRO_JSON_SIZE'''
    error: str
    def __init__(self,key,size):
        super().__init__(key)
        self.error = "Propriedade '" + key + "' nao tem o tamanho minimo de " + str(size)
    def __str__(self):
        return str(self.error)
    
@dataclass
class AuthExpire(Exception):
    '''ERRO_AUTENTICACAO_EXPIRE'''
    error: str
    def __init__(self):
        self.error = "O token expirou"
        super().__init__(self.error)
        
    def __str__(self):
        return str(self.error)
    
@dataclass
class AuthInvalid(Exception):
    '''ERRO_AUTENTICACAO_INVALIDA'''
    error: str
    def __init__(self):
        self.error = "O token e invalido"
        super().__init__(self.error)
        
    def __str__(self):
        return str(self.error)

@dataclass
class AuthCred(Exception):
    '''ERRO_AUTENTICACAO'''
    error: str
    def __init__(self):
        self.error = "Uma conta nao foi encotrada com estas credenciais"
        super().__init__(self.error)
    def __str__(self):
        return str(self.error)
    
@dataclass
class AuthMissing(Exception):
    '''ERRO_AUTENTICACAO_FALTA'''
    error: str
    def __init__(self):
        self.error = "Um token (Authorization) nao foi dado num endpoint com restricao de acesso"
        super().__init__(self.error)
    def __str__(self):
        return str(self.error)    
    
    
