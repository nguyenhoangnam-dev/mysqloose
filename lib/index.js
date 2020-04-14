const schemaClass = require("./schema");
const modelClass = require("./model");
const query = require("./query");
const mysql = require("mysql");

class mysqloose {
  constructor() {
    this.Schema = schemaClass;
    this.Connection;
  }

  model(tableName, schemaInstance) {
    let schemaString = schemaInstance.columnDefinition();
    let Connection = this.Connection;

    let queryString = `CREATE TABLE IF NOT EXISTS ${Connection.escapeId(
      tableName
    )} ${schemaString}`;

    Connection.query(queryString, (error, results, fields) => {
      if (error) throw error;
    });

    // @ts-ignore
    modelClass.prototype.Connection = Connection;
    // @ts-ignore
    modelClass.prototype.tableName = tableName;

    let queryInstance = new query(tableName, Connection);
    // @ts-ignore
    modelClass.__proto__ = queryInstance;

    return modelClass;
  }

  connect(connectionString, callback) {
    const connection = mysql.createConnection(connectionString);

    connection.connect((err) => {
      if (err) callback(err);
    });

    this.Connection = connection;
  }
}

module.exports = mysqloose;
