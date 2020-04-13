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

  this.find = (filter, projection, callback) => {
    if (this.Connection) {
      if (this.tableName) {
        let tableName = this.tableName;
        if (typeof projection == "function") {
          callback = projection;
          let selectString = `SELECT * FROM ${tableName}`;

          if (this.isEmpty(filter)) {
            selectString += ` WHERE 1 = 1`;

            this.Connection.query(selectString, (error, results, fields) => {
              if (error) callback(error, null);

              callback(false, results);
            });
          } else {
            let filterString = this.filterToString(filter);
            selectString += ` WHERE ${filterString}`;

            this.Connection.query(selectString, (error, results, fields) => {
              if (error) callback(error, null);

              callback(false, results);
            });
          }
        } else {
          if (typeof projection == "string") {
            let tableField = projection.split(" ").join(", ");
            let selectString = `SELECT ${tableField} FROM ${tableName}`;

            if (this.isEmpty(filter)) {
              selectString += ` WHERE 1 = 1`;

              this.Connection.query(selectString, (error, results, fields) => {
                if (error) callback(error, null);

                callback(false, results);
              });
            } else {
              let filterString = this.filterToString(filter);
              selectString += ` WHERE ${filterString}`;

              this.Connection.query(selectString, (error, results, fields) => {
                if (error) callback(error, null);

                callback(false, results);
              });
            }
          } else {
            throw "Projection must be string.";
          }
        }
      } else {
        throw "Can not find model.";
      }
    } else {
      throw "Can not connect to database.";
    }
  };

  this.findById = (id, projection, callback) => {
    this.find({ id }, projection, callback);
  };

  this.findOne = (filter, projection, callback) => {
    if (this.Connection) {
      if (this.tableName) {
        let tableName = this.tableName;
        if (typeof projection == "function") {
          callback = projection;
          let selectString = `SELECT * FROM ${tableName}`;

          if (this.isEmpty(filter)) {
            selectString += ` WHERE 1 = 1 LIMIT 1`;

            this.Connection.query(selectString, (error, results, fields) => {
              if (error) callback(error, null);

              callback(false, results);
            });
          } else {
            let filterString = this.filterToString(filter);
            selectString += ` WHERE ${filterString} LIMIT 1`;

            this.Connection.query(selectString, (error, results, fields) => {
              if (error) callback(error, null);

              callback(false, results);
            });
          }
        } else {
          if (typeof projection == "string") {
            let tableField = projection.split(" ").join(", ");
            let selectString = `SELECT ${tableField} FROM ${tableName}`;

            if (this.isEmpty(filter)) {
              selectString += ` WHERE 1 = 1 LIMIT 1`;

              this.Connection.query(selectString, (error, results, fields) => {
                if (error) callback(error, null);

                callback(false, results);
              });
            } else {
              let filterString = this.filterToString(filter);
              selectString += ` WHERE ${filterString} LIMIT 1`;

              this.Connection.query(selectString, (error, results, fields) => {
                if (error) callback(error, null);

                callback(false, results);
              });
            }
          } else {
            throw "Projection must be string.";
          }
        }
      } else {
        throw "Can not find model.";
      }
    } else {
      throw "Can not connect to database.";
    }
  };

  this.updateOne = (filter, doc, callback) => {
    if (this.Connection) {
      if (this.tableName) {
        let tableName = this.tableName;
        if (typeof doc == "function") {
          throw "Can not update";
        } else {
          let updateString = `UPDATE ${tableName}`;
          let setString = this.filterToString(doc);
          updateString += ` SET ${setString}`;

          if (this.isEmpty(filter)) {
            updateString += ` WHERE 1 = 1 LIMIT 1`;

            this.Connection.query(updateString, (error, results, fields) => {
              if (error) callback(error, null);

              callback(false, results);
            });
          } else {
            let filterString = this.filterToString(filter);
            updateString += ` WHERE ${filterString} LIMIT 1`;

            this.Connection.query(updateString, (error, results, fields) => {
              if (error) callback(error, null);

              callback(false, results);
            });
          }
        }
      } else {
        throw "Can not find model.";
      }
    } else {
      throw "Can not connect to database.";
    }
  };

  this.deleteOne = (filter, callback) => {
    if (this.Connection) {
      if (this.tableName) {
        let tableName = this.tableName;
        let deleteString = `DELETE FROM ${tableName}`;
        if (this.isEmpty(filter)) {
          deleteString += ` WHERE 1 = 1 LIMIT 1`;

          this.Connection.query(deleteString, (error, results, fields) => {
            if (error) callback(error, null);

            callback(false, results);
          });
        } else {
          let filterString = this.filterToString(filter);
          deleteString += ` WHERE ${filterString} LIMIT 1`;

          this.Connection.query(deleteString, (error, results, fields) => {
            if (error) callback(error, null);

            callback(false, results);
          });
        }
      } else {
        throw "Can not find model.";
      }
    } else {
      throw "Can not connect to database.";
    }
  };
}

module.exports = query;
