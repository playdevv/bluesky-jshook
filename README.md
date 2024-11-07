# Bluesky Xposed Hook Script for React Native Networking

Este é um script jshook para o app Bluesky, construído usando o Rhino e o Xposed Framework. Ele intercepta respostas HTTP no módulo `NetworkingModule` do React Native, loga os dados da requisição e resposta, e cria uma resposta clonada.

## Funcionalidades

- **Interceptação de Respostas HTTP**: Hook no método `onResponse` do módulo `NetworkingModule` do React Native.
- **Log de Informações**: Log dos dados da requisição (URL, método e cabeçalhos) e do corpo da resposta.
- **Manipulação do Corpo da Resposta**: Clonagem do corpo da resposta para ser reutilizado.
- **Compatível com Xposed**: Utiliza o Xposed para manipular a execução do app em tempo de execução.

## Requisitos

- **Android**: Este script requer `jshook` instalado e configurado no app do Bluesky para funcionar com o Rhino + Xposed Framework.
- **Bluesky App**: Este script foi feito especificamente para a versão Android do app Bluesky.
- **Rhino**: O script usa Rhino para trabalhar com código JavaScript.

## Uso

Este script intercepta todas as requisições HTTP feitas pelo app Bluesky e loga os seguintes dados no console:

- **Método**: Tipo de método HTTP usado (GET, POST, etc.)
- **URL**: URL da requisição.
- **Cabeçalhos**: Todos os cabeçalhos da requisição.
- **Dados POST**: Corpo da requisição POST, se aplicável.
- **Corpo da Resposta**: Conteúdo da resposta em texto.

## Exemplo de Log

```plaintext
METHOD:
 - POST
URL:
 - https://api.bluesky.com/some_endpoint
HEADERS:
 - {User-Agent=Bluesky, Content-Type=application/json}
POSTDATA:
 - {"field1":"value1","field2":"value2"}
RESPONSE:
 - {"responseField1":"responseValue1"}
====================
