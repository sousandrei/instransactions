# Projeto Instransactions

Aluno: Andrei Felipe Silveira Sousa - 13/0039985
sousandrei@outlook.com
Rodrigo de Sousa Saldanha - 11/0139143

## SERVER

O servidor comporta toda a implementação pedida no projeto, com banco
de dados nao-relacional e modulos HTTP2 e express para lidar com 
os request no protocolo HTTP.
Esta rodando agora em uma instancia do Google Cloud atraz de um servidor
NGINX que redireciona todos os requests para ele no momento. O servidor ja foi populado com dados mocados para testes

Servidor feito em NodeJS

Usado HTTP2 para otimizacao

Banco de dados MongoDB

Testes executados rodando mocha/istanbul

Documentacao de API feita em apidocs

Documentacao de codigo feito em JSDoc

Instrucoes de uso internas

## APP

Feito para android, com algumas das features pedidas. A imcompletude da 
implementacao deste lado se deve ao fato do trabalho ser feito sozinho e 
a complexidade proposta pelo aluno ao fazer algo aplicado para mercado.

Os testes foram pulados na limitacao de tempo pois nao se recomenda 
fazer TDD em android vide que o codigo ao mesmo tempo lida com UI e 
CORE, entao certos modulos podem ser feitos com TDD porem as 
activitys nao.

Desenvolvido em Andoid Studio

Linguagem JAVA (similar a C++ que seria usada no projeto padrao, usando Qt)

Testes usados serao em JUnit, com suporte a cobertura

Documentacao usada sera JAVADOC (mesma de C++ no oxygen)

O App ja vem pre-configurado para conversar com o servidor que esta rodando na Google Cloud.
