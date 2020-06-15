
//npx knex migrate:latest (executa a ultima migrate)
//npx knex migrate:make nome_tabela (cria a migrate)
//npx knex migrate:rollback (desfaz a ultima migrate criada)
//npx knex migrate:status (mostra todas as migrate executadas)

exports.up = function(knex) {
  return knex.schema.createTable('ongs', function(table){
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
