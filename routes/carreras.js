var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var Carrera = require('../models/user').Carrera;

router.get('/api/v1/carreras/', function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Select Data
        var query = client.query("");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if(err) {
          console.log(err);
      }

  });

});

module.exports = router;