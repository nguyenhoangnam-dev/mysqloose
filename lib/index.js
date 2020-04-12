const schemaClass = require("./schema");
const modelClass = require("./model");
const mysql = require("mysql");

class mysqler {
  constructor() {
    this.Schema = schemaClass;
    this.Connection;
  }

  model(tableName, schemaInstance) {
    let schemaString = schemaInstance.columnDefinition();
    let queryString = `CREATE TABLE IF NOT EXISTS ${tableName} ${schemaString}`;
    this.Connection.query(queryString, (error, results, fields) => {
      if (error) throw error;
    });

    modelClass.prototype.Connection = this.Connection;
    modelClass.prototype.tableName = tableName;
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

module.exports = mysqler;
