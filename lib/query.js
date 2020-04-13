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

  this.find = (filter, projection = null, callback) => {
    if (this.Connection) {
      if (this.tableName) {
        let tableName = this.tableName;
        if (typeof projection == "function") {
          callback = projection;
          let selectString = `SELECT * FROM ${tableName}`;

          if (this.isEmpty(filter)) {
            throw "Error empty filter.";
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
              throw "Error empty filter.";
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
}

module.exports = query;
