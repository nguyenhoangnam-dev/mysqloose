// @ts-nocheck
function Model(dataObject) {
  this.dataObject = dataObject;
  this.Connection;
  this.tableName;

  this.dataDefinition = () => {
    let dataString = "( ";
    let dataArray = [];
    let dataObject = this.dataObject;
    for (let key in dataObject) {
      dataArray.push(`'${dataObject[key]}'`);
    }

    dataString += dataArray.join(", ");
    dataString += " )";
    return dataString;
  };

  this.keyDefinition = () => {
    let keyString = "( ";
    let keyArray = [];
    let keyObject = this.dataObject;
    for (let key in keyObject) {
      keyArray.push(`${key}`);
    }

    keyString += keyArray.join(", ");
    keyString += " )";
    return keyString;
  };

  this.save = (callback) => {
    if (this.Connection) {
      if (this.tableName) {
        let tableName = this.tableName;
        let schemaString = this.keyDefinition();
        let dataString = this.dataDefinition();
        let insertString = `INSERT INTO ${tableName} ${schemaString} VALUES ${dataString}`;
        this.Connection.query(insertString, (error, results, fields) => {
          if (error) callback(error, null);
          callback(false, results);
        });
      } else {
        throw "Can not find model.";
      }
    } else {
      throw "Can not connect to database.";
    }
  };
}

module.exports = Model;
