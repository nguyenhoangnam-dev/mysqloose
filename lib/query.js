function query(tableName, Connection) {
  this.tableName = tableName;
  this.Connection = Connection;

  this.isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  this.filterToString = (filter) => {
    let filterString = "";
    let filterArray = [];
    for (let key in filter) {
      filterArray.push(`${key} = '${filter[key]}'`);
    }

    filterString += filterArray.join(" AND ");
    return filterString;
  };

  this.simplifyObject = (result) => {
    return Object.values(JSON.parse(JSON.stringify(result)));
  };

  this.mainFind = (filter, projection, callback, limit = false) => {
    if (this.Connection) {
      if (this.tableName) {
        let tableName = this.tableName;
        let tableField = "*";
        let filterString = "1 = 1";
        if (typeof projection == "function") {
          callback = projection;
          if (!this.isEmpty(filter)) filterString = this.filterToString(filter);
        } else {
          if (typeof projection == "string") {
            tableField = projection.split(" ").join(", ");
            if (!this.isEmpty(filter))
              filterString = this.filterToString(filter);
          } else throw "Set of fields must be string.";
        }

        let selectString = `SELECT ${this.Connection.escapeId(
          tableField
        )} FROM ${this.Connection.escapeId(tableName)} WHERE ${filterString}`;

        if (limit) selectString += " LIMIT 1";
        this.Connection.query(selectString, (error, results, fields) => {
          if (error) callback(error, null);

          let resultObject = this.simplifyObject(results);
          if (resultObject.length == 0) {
            callback(false, {});
          } else if (resultObject.length == 1) {
            callback(false, resultObject[0]);
          } else {
            callback(false, resultObject);
          }
        });
      } else throw "Can not find model.";
    } else throw "Can not connect to database.";
  };

  this.find = (filter, projection, callback) => {
    this.mainFind(filter, projection, callback);
  };

  this.findOne = (filter, projection, callback) => {
    this.mainFind(filter, projection, callback, true);
  };

  this.findOneAndDelete = (condition, callback) => {
    if (this.Connection) {
      if (this.tableName) {
        let tableName = this.tableName;
        let tableField = "*";
        let filterString = "1 = 1";
        if (!this.isEmpty(condition))
          filterString = this.filterToString(condition);

        let selectString = `SELECT ${this.Connection.escapeId(
          tableField
        )} FROM ${this.Connection.escapeId(
          tableName
        )} WHERE ${this.Connection.escapeId(filterString)} LIMIT 1`;

        this.Connection.query(selectString, (error, results, fields) => {
          if (error) callback(error, null);

          let deleteString = `DELETE FROM ${this.Connection.escapeId(
            tableName
          )} WHERE ${this.Connection.escapeId(filterString)} LIMIT 1`;
          this.Connection.query(deleteString, (error, results, fields) => {
            if (error) callback(error);

            let resultObject = this.simplifyObject(results);
            if (resultObject.length == 0) {
              callback(false, {});
            } else {
              callback(false, resultObject[0]);
            }
          });
        });
      } else throw "Can not find model.";
    } else throw "Can not connect to database.";
  };

  this.findOneAndUpdate = (condition, update, callback) => {
    if (this.Connection) {
      if (this.tableName) {
        let tableName = this.tableName;
        let tableField = "*";
        let filterString = "1 = 1";
        if (!this.isEmpty(condition))
          filterString = this.filterToString(condition);

        let selectString = `SELECT ${this.Connection.escapeId(
          tableField
        )} FROM ${this.Connection.escapeId(
          tableName
        )} WHERE ${this.Connection.escapeId(filterString)} LIMIT 1`;

        this.Connection.query(selectString, (error, results, fields) => {
          if (error) callback(error, null);

          let deleteString = `DELETE FROM ${this.Connection.escapeId(
            tableName
          )} WHERE ${this.Connection.escapeId(filterString)} LIMIT 1`;
          this.Connection.query(deleteString, (error, results, fields) => {
            if (error) callback(error);

            let setString = this.filterToString(update);
            let updateString = `UPDATE ${this.Connection.escapeId(
              tableName
            )} SET ${this.Connection.escapeId(
              setString
            )} WHERE ${this.Connection.escapeId(filterString)} LIMIT 1`;

            this.Connection.query(updateString, (error, results, fields) => {
              if (error) callback(error);

              let resultObject = this.simplifyObject(results);
              if (resultObject.length == 0) {
                callback(false, {});
              } else {
                callback(false, resultObject[0]);
              }
            });
          });
        });
      } else throw "Can not find model.";
    } else throw "Can not connect to database.";
  };

  this.findById = (id, projection, callback) => {
    this.mainFind(id, projection, callback, true);
  };

  this.findByIdAndDelete = (id, callback) => {
    this.findOneAndDelete(id, callback);
  };

  this.findByIdAndUpdate = (id, update, callback) => {
    this.findOneAndUpdate(id, update, callback);
  };

  this.mainUpdate = (filter, doc, callback, limit = false) => {
    if (this.Connection) {
      if (this.tableName) {
        let tableName = this.tableName;
        if (typeof doc == "function") throw "Can not update";
        else {
          let filterString = "1 = 1";
          if (!this.isEmpty(filter)) filterString = this.filterToString(filter);
          let setString = this.filterToString(doc);
          let updateString = `UPDATE ${this.Connection.escapeId(
            tableName
          )} SET ${setString} WHERE ${filterString}`;

          if (limit) updateString += " LIMIT 1";
          this.Connection.query(updateString, (error, results, fields) => {
            if (error) callback(error);

            callback(false);
          });
        }
      } else throw "Can not find model.";
    } else throw "Can not connect to database.";
  };

  this.updateOne = (filter, doc, callback) => {
    this.mainUpdate(filter, doc, callback);
  };

  this.updateMany = (filter, doc, callback) => {
    this.mainUpdate(filter, doc, callback, true);
  };

  this.mainDelete = (filter, callback, limit = false) => {
    if (this.Connection) {
      if (this.tableName) {
        let tableName = this.tableName;
        let filterString = "1 = 1";
        if (!this.isEmpty(filter)) filterString = this.filterToString(filter);
        let deleteString = `DELETE FROM ${this.Connection.escapeId(
          tableName
        )} WHERE ${filterString}`;
        if (limit) deleteString += " LIMIT 1";
        this.Connection.query(deleteString, (error, results, fields) => {
          if (error) callback(error);

          callback(false);
        });
      } else throw "Can not find model.";
    } else throw "Can not connect to database.";
  };

  this.deleteOne = (filter, callback) => {
    this.mainDelete(filter, callback);
  };

  this.deleteMany = (filter, callback) => {
    this.mainDelete(filter, callback, true);
  };

  this.countDocuments = (filter, callback) => {
    if (this.Connection) {
      if (this.tableName) {
        let tableName = this.tableName;
        let filterString = "1 = 1";
        if (!this.isEmpty(filter)) filterString = this.filterToString(filter);
        let countString = `SELECT COUNT(*) FROM ${this.Connection.escapeId(
          tableName
        )} WHERE ${filterString}`;
        this.Connection.query(countString, (error, results, fields) => {
          if (error) callback(error, results);

          let resultObject = this.simplifyObject(results);
          if (resultObject.length == 0) {
            callback(false, {});
          } else {
            callback(false, resultObject[0]["COUNT(*)"]);
          }
        });
      } else throw "Can not find model.";
    } else throw "Can not connect to database.";
  };

  this.dataDefinition = (dataObject) => {
    let dataString = "( ";
    let dataArray = [];
    for (let key in dataObject) {
      dataArray.push(`'${dataObject[key]}'`);
    }

    dataString += dataArray.join(", ");
    dataString += " )";
    return dataString;
  };

  this.keyDefinition = (keyObject) => {
    let keyString = "( ";
    let keyArray = [];
    for (let key in keyObject) {
      keyArray.push(`${key}`);
    }

    keyString += keyArray.join(", ");
    keyString += " )";
    return keyString;
  };

  this.create = (doc, callback) => {
    if (this.Connection) {
      if (this.tableName) {
        let tableName = this.tableName;
        let dataString = this.dataDefinition(doc);
        let keyString = this.keyDefinition(doc);
        let insertString = `INSERT INTO ${this.Connection.escapeId(
          tableName
        )} ${keyString} VALUES ${dataString}`;
        this.Connection.query(insertString, (error, results, fields) => {
          if (error) callback(error, results);

          callback(false, doc);
        });
      } else throw "Can not find model.";
    } else throw "Can not connect to database.";
  };
}

module.exports = query;
