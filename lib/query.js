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

        let selectString = `SELECT ${tableField} FROM ${tableName} WHERE ${filterString}`;

        if (limit) selectString += " LIMIT 1";
        this.Connection.query(selectString, (error, results, fields) => {
          if (error) callback(error, null);

          let resultObject = this.simplifyObject(results);
          callback(false, resultObject);
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

  this.findById = (id, projection, callback) => {
    this.mainFind({ id }, projection, callback);
  };

  this.updateOne = (filter, doc, callback) => {
    if (this.Connection) {
      if (this.tableName) {
        let tableName = this.tableName;
        if (typeof doc == "function") throw "Can not update";
        else {
          let filterString = "1 = 1";
          if (!this.isEmpty(filter)) filterString = this.filterToString(filter);
          let setString = this.filterToString(doc);
          let updateString = `UPDATE ${tableName} SET ${setString} WHERE ${filterString} LIMIT 1`;

          this.Connection.query(updateString, (error, results, fields) => {
            if (error) callback(error);

            callback(false);
          });
        }
      } else throw "Can not find model.";
    } else throw "Can not connect to database.";
  };

  this.deleteOne = (filter, callback) => {
    if (this.Connection) {
      if (this.tableName) {
        let tableName = this.tableName;
        let filterString = "1 = 1";
        if (!this.isEmpty(filter)) filterString = this.filterToString(filter);
        let deleteString = `DELETE FROM ${tableName} WHERE ${filterString} LIMIT 1`;

        this.Connection.query(deleteString, (error, results, fields) => {
          if (error) callback(error);

          callback(false);
        });
      } else throw "Can not find model.";
    } else throw "Can not connect to database.";
  };
}

module.exports = query;
