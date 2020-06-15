/*npm install celebrate: instala um pacote do tipo validação*/
const {celebrate, Segments, Joi} = require('celebrate');

const express = require('express');
const crypto = require('crypto');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
//const connection = require('./database/connection'); //importa o arquivo de conexão
const routes = express.Router(); //colocando o modulo de rotas em uma variavel

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
/*
required: campo requerido
email: valida o campo como ter o arroba e seguido dele um .com
min: minimo de caracter
max: maximo de caracter
length: tamanho total
*/
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create); //adicionando a validação celebrate()

/*verificação do header é dentro do object, seguido de unknown pois não se sabe qual autorização será enviada, pois envia varias*/
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);

routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    })
}), IncidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete); //passa o id a ser excluido

/*routes.get('/ongs', async (request, response) =>{
    const ongs = await connection('ongs').select('*'); //espera a conexãos er realizada na tabela ongs, seleciona todos os dados dentro dela

    return response.json(ongs);
});*/

/*metodo http
    get: buscar uma informação do backend
    post: criar uma informação no backend
    put: alterar uma informação do backemd
    delete: deletar uma informação no backend
*/
//declaração de rotas, apos o /
//routes.post('/ongs', async (request, response) => {
    //return response.send('ola mundo');
    //const params = request.query; //acessa o parametro vindo da requisição
    //const params = request.params;
    //const body = request.body;
    

    //console.log(data);

    

    /*return response.json({
        evento: 'Semana Omnistack 11.0',
        aluno: 'Marcelo Bolsoni Siqueira'
    }); //retornar objetos nas chaves*/

    
//}); //rota raiz

module.exports = routes; //exportar variaveis de dentro de um arquivo