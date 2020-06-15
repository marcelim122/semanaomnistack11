//node index.js para executar o programa, ou npm start
const express = require('express'); //importar modulo express para variavel express
const cors = require('cors');
const {errors} = require('celebrate');
const routes = require('./routes'); //importando o arquivo

const app = express(); //instanciando a aplicação

app.use(cors()); //permissao de acesso, sem nenhuma origem da acesso a qualquer aplicação
app.use(express.json()); //antes das requisições, transforma o json em um formato js
app.use(routes); //sempre abaixo do express
app.use(errors()); //trata os erros gerados pela validação

/*tipos de parametros
    query parms: parametros nomeados na rota apos o simbolo de ? (filtro, paginação) /users?name=Marcelo
    route parms: parametros usados para identificar recursos /users/:id
    request body: corpo da requisição, utilizado apra criar ou alterar recursos
*/
/*Banco de dados
    driver: select * from users
    query builder: table('users').select('*'),where()
*/




app.listen(3333); //usando localhost:3333 vc entra direto no projeto, ctrl+c encerra servidor
