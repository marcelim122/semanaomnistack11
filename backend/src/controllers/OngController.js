const crypto = require('crypto');
const connection = require('../database/connection'); //importa o arquivo de conexão

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*'); //espera a conexãos er realizada na tabela ongs, seleciona todos os dados dentro dela
    
        return response.json(ongs);
    },

    async create(request, response){
        const {name, email, whatsapp, city, uf} = request.body;
        const id = crypto.randomBytes(4).toString('HEX'); //string de 4 bytes hexadecimais, gerando o id

        //faz a conexão de inserção de dados na tabela ongs
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({id});
    }
};