const Schema = require("./schema");
const modelClass = require("./model");
const mysql = require("mysql");

function mysqloose() {
  this.Connection;
  this.Schema = Schema;

  this.model = function model(tableName, schemaInstance) {
    let schemaString = schemaInstance.columnDefinition();
    let Connection = this.Connection;

    let queryString = `CREATE TABLE IF NOT EXISTS ${Connection.escapeId(
      tableName
    )} ${schemaString}`;

    Connection.query(queryString, (error, results, fields) => {
      if (error) throw error;
    });

    let model = modelClass.compile(tableName, Connection);
    return model;
  };

  this.connect = function connect(connectionString, callback) {
    const connection = mysql.createConnection(connectionString);

    connection.connect((err) => {
      if (err) callback(err);
    });

    this.Connection = connection;
  };
}

module.exports = mysqloose;
