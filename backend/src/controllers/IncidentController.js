const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        /*contar a quantidade total de casos*/
        const [count] = await connection('incidents').count();
        //console.log(count);
        response.header('X-Total-Count', count['count(*)']); //informa ao header do insomnia o total contado

        /*limita a 5 registros por pagina, sendo numero da (pagina-1)x5 que são a quantidade de registro*/
        const {page = 1} = request.query;

        const incidents = await connection('incidents').join('ongs', 'ongs.id', '=', 'incidents.ong_id').limit(5).offset((page-1)*5)
        .select(['incidents.*', 
            'ongs.name', 
            'ongs.email', 
            'ongs.whatsapp', 
            'ongs.city', 
            'ongs.uf']); //o join faz a relação entre tabelas, retorna os dados da ong que tem o id igual na tabela de incidents, todos os dados da tabela incidents, seguidos de alguns dados da tabela ongs

        return response.json(incidents);
    },

    async create(request, response){
        const {title, description, value} = request.body;
        request.headers; //informações do contexto da requisição, autenticação fica aqui dentro
        const ong_id = request.headers.authorization;

        /*primeiro valor do array, vai ser armazenado na variavel id*/
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({id});
    },

    async delete(request, response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        /*busca no banco o id solicitado, dentro da tabela ong_id, retornando apenas o primeiro resultado encontrado*/
        const incident = await connection('incidents').where('id', id).select('ong_id').first();

        /*verifica se o id que foi buscado é diferente do ong_id que esta logado na aplicação, da erro*/
        if(incident.ong_id != ong_id){
            return response.status(401).json({error: 'Operation not permitted.'});
        }

        await connection('incidents').where('id', id).delete(); //deleta o id do abnco caso n der erro de ID

        return response.status(204).send();
    } 
};