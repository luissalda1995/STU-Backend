var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : '',
    user     : 'postgres',
    password : 'Sapco123',
    database : 'sapco',
    charset  : 'utf8'
  }
});

var bookshelf = require('bookshelf')(knex);

var Carrera = bookshelf.Model.extend({
  tableName: 'tgen_usuarios'
});

module.exports.Carrera = Carrera;
