const helpers = require("./helpers/helpers");
const query = require("./helpers/query");
function Model(dataObject) {
  this.dataObject = dataObject;

  this.save = function save(callback) {
    if (this.Connection) {
      if (this.tableName) {
        let tableName = this.tableName;
        let schemaString = helpers.keyDefinition(this.dataObject);
        let dataString = helpers.dataDefinition(this.dataObject);
        let insertString = `INSERT INTO ${tableName} ${schemaString} VALUES ${dataString}`;
        this.Connection.query(insertString, (error, results, fields) => {
          if (error) callback(error, null);
          callback(false, dataObject);
        });
      } else {
        throw "Can not find model.";
      }
    } else {
      throw "Can not connect to database.";
    }
  };
}

Model.compile = function compile(tableName, Connection) {
  let model;
  model = function model(dataObject) {
    if (!(this instanceof model)) return new model(dataObject);

    Model.call(this, dataObject);
  };

  model.tableName = tableName;
  model.Connection = Connection;

  if (!(model.prototype instanceof Model)) {
    model.__proto__ = Model;
    model.prototype.__proto__ = Model.prototype;
  }

  model.prototype.tableName = tableName;
  model.prototype.Connection = Connection;

  return model;
};

// Model.mainFind = function mainFind(
//   filter,
//   projection,
//   callback,
//   limit = false
// ) {
//   console.log(this.tableName);
//   if (this.Connection) {
//     if (this.tableName) {
//       let tableName = this.tableName;
//       let tableField = "*";
//       let filterString = "1 = 1";
//       if (typeof projection == "function") {
//         callback = projection;
//         if (!helpers.isEmpty(filter))
//           filterString = helpers.filterToString(filter);
//       } else {
//         if (typeof projection == "string") {
//           tableField = projection.split(" ").join(", ");
//           if (!helpers.isEmpty(filter))
//             filterString = helpers.filterToString(filter);
//         } else throw "Set of fields must be string.";
//       }

//       let selectString = `SELECT ${this.Connection.escapeId(
//         tableField
//       )} FROM ${this.Connection.escapeId(tableName)} WHERE ${filterString}`;

//       if (limit) selectString += " LIMIT 1";
//       this.Connection.query(selectString, (error, results, fields) => {
//         if (error) callback(error, null);

//         let resultObject = helpers.simplifyObject(results);
//         if (resultObject.length == 0) {
//           callback(false, {});
//         } else if (resultObject.length == 1) {
//           callback(false, resultObject[0]);
//         } else {
//           callback(false, resultObject);
//         }
//       });
//     } else throw "Can not find model.";
//   } else throw "Can not connect to database.";
// };

Model.find = function find(filter, projection, callback) {
  // this.mainFind(filter, projection, callback);
  query.mainFind(this.tableName, this.Connection, filter, projection, callback);
};

Model.findOne = function findOne(filter, projection, callback) {
  // this.mainFind(filter, projection, callback, true);
  query.mainFind(
    this.tableName,
    this.Connection,
    filter,
    projection,
    callback,
    true
  );
};

Model.findOneAndDelete = function findOneAndDelete(condition, callback) {
  if (this.Connection) {
    if (this.tableName) {
      let tableName = this.tableName;
      let tableField = "*";
      let filterString = "1 = 1";
      if (!helpers.isEmpty(condition))
        filterString = helpers.filterToString(condition);

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

          let resultObject = helpers.simplifyObject(results);
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

Model.findOneAndUpdate = function findOneAndUpdate(
  condition,
  update,
  callback
) {
  if (this.Connection) {
    if (this.tableName) {
      let tableName = this.tableName;
      let tableField = "*";
      let filterString = "1 = 1";
      if (!helpers.isEmpty(condition))
        filterString = helpers.filterToString(condition);

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

          let setString = helpers.filterToString(update);
          let updateString = `UPDATE ${this.Connection.escapeId(
            tableName
          )} SET ${this.Connection.escapeId(
            setString
          )} WHERE ${this.Connection.escapeId(filterString)} LIMIT 1`;

          this.Connection.query(updateString, (error, results, fields) => {
            if (error) callback(error);

            let resultObject = helpers.simplifyObject(results);
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

Model.findById = function findById(id, projection, callback) {
  // this.mainFind(id, projection, callback, true);
  query.mainFind(
    this.tableName,
    this.Connection,
    id,
    projection,
    callback,
    true
  );
};

Model.findByIdAndDelete = function findByIdAndDelete(id, callback) {
  this.findOneAndDelete(id, callback);
};

Model.findByIdAndUpdate = function findByIdAndUpdate(id, update, callback) {
  this.findOneAndUpdate(id, update, callback);
};

// Model.mainUpdate = function mainUpdate(filter, doc, callback, limit = false) {
//   if (this.Connection) {
//     if (this.tableName) {
//       let tableName = this.tableName;
//       if (typeof doc == "function") throw "Can not update";
//       else {
//         let filterString = "1 = 1";
//         if (!helpers.isEmpty(filter))
//           filterString = helpers.filterToString(filter);
//         let setString = helpers.filterToString(doc);
//         let updateString = `UPDATE ${this.Connection.escapeId(
//           tableName
//         )} SET ${setString} WHERE ${filterString}`;

//         if (limit) updateString += " LIMIT 1";
//         this.Connection.query(updateString, (error, results, fields) => {
//           if (error) callback(error);

//           callback(false);
//         });
//       }
//     } else throw "Can not find model.";
//   } else throw "Can not connect to database.";
// };

Model.updateOne = function updateOne(filter, doc, callback) {
  // this.mainUpdate(filter, doc, callback, true);
  query.mainUpdate(
    this.tableName,
    this.Connection,
    filter,
    doc,
    callback,
    true
  );
};

Model.updateMany = function updateMany(filter, doc, callback) {
  // this.mainUpdate(filter, doc, callback);
  query.mainUpdate(this.tableName, this.Connection, filter, doc, callback);
};

// Model.mainDelete = function mainDelete(filter, callback, limit = false) {
//   if (this.Connection) {
//     if (this.tableName) {
//       let tableName = this.tableName;
//       let filterString = "1 = 1";
//       if (!helpers.isEmpty(filter))
//         filterString = helpers.filterToString(filter);
//       let deleteString = `DELETE FROM ${this.Connection.escapeId(
//         tableName
//       )} WHERE ${filterString}`;
//       if (limit) deleteString += " LIMIT 1";
//       this.Connection.query(deleteString, (error, results, fields) => {
//         if (error) callback(error);

//         callback(false);
//       });
//     } else throw "Can not find model.";
//   } else throw "Can not connect to database.";
// };

Model.deleteOne = function deleteOne(filter, callback) {
  // this.mainDelete(filter, callback);
  query.mainDelete(this.tableName, this.Connection, filter, callback, true);
};

Model.deleteMany = function deleteMany(filter, callback) {
  // this.mainDelete(filter, callback, true);
  query.mainDelete(this.tableName, this.Connection, filter, callback);
};

Model.countDocuments = function countDocuments(filter, callback) {
  if (this.Connection) {
    if (this.tableName) {
      let tableName = this.tableName;
      let filterString = "1 = 1";
      if (!helpers.isEmpty(filter))
        filterString = helpers.filterToString(filter);
      let countString = `SELECT COUNT(*) FROM ${this.Connection.escapeId(
        tableName
      )} WHERE ${filterString}`;
      this.Connection.query(countString, (error, results, fields) => {
        if (error) callback(error, results);

        let resultObject = helpers.simplifyObject(results);
        if (resultObject.length == 0) {
          callback(false, {});
        } else {
          callback(false, resultObject[0]["COUNT(*)"]);
        }
      });
    } else throw "Can not find model.";
  } else throw "Can not connect to database.";
};

Model.create = function create(doc, callback) {
  if (this.Connection) {
    if (this.tableName) {
      let tableName = this.tableName;
      let dataString = helpers.dataDefinition(doc);
      let keyString = helpers.keyDefinition(doc);
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

module.exports = Model;
