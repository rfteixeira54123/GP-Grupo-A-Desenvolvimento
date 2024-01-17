from enum import Enum
from http.client import ACCEPTED
from flask import abort
from flask import request
from dataclasses import dataclass
from functools import wraps


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




def CheckJson(properties = []):
    """Verifica corpo JSON seguindo a estrutura:
    ('key',type,size)
    'key' representa o nome da propriedade obrigatória
    type tem que ser um TIPO de variavel que este vai tentar dar cast
    size (opcional) serve para normalmente verificar o tamamnho de uma str

    Produz os seguintes erros:
    500 - properties mal feito
    422 - Corpo JSON nao encontrado
    JSONPropError - Argumentos obrigatorios nao encontrados
    JSONTypeError - Propriedade nao tem o mesmo tipo do que o especificado
    JSONSizeError - Propriedade nao tem o tamanho minimo especificado
    """
    def CheckKeys_Function(func):
        @wraps(func)
        def CheckKeys_Wrapper(*args, **kwargs):
            try:
                for prop in properties:
                    str(prop[0])
                    type(prop[1])
            except:
                abort(500) #Verificar se argumentos no properties existe


            try:
                body = request.get_json()
                keys_body = body.keys() #Buscar keys
            except:
                abort(422) #Sem corpo JSON mas este é preciso


            #('key',type,size(optional))
            for prop in properties:
                key = prop[0]
                typeof = prop[1]
                try:
                    size = int(prop[2])
                except:
                    size = 0
                if key not in keys_body or body[key] == None:
                    raise JSONPropError(key) #garantir que o corpo JSON tem os argumentos obrigatórios

                try:
                   typeof(body[key])
                except:
                    raise JSONTypeError(typeof,key)#garantir que esta propriedade é valida

                if size != 0:
                    if len(str(body[key])) < size:
                        raise JSONSizeError(key,size)#garantir que esta propriedade tem um tamanho válido
                

            val = func(*args, **kwargs)
            #Agora podes executar a funcao sabendo que o JSON tem as propriedades, fica á responsabilidade de cada contexto diferente de input agora se os dados estão válidos ou nao
            return val

        return CheckKeys_Wrapper
    return CheckKeys_Function
