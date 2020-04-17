const helpers = require("./helpers/helpers");
const query = require("./helpers/query");
function Model(dataObject) {
  this.dataObject = dataObject;

  this.save = function save(callback) {
    let tableName = this.tableName;
    let Connection = this.Connection;

    if (!Connection) throw "Can not connect to database.";
    if (!tableName) throw "Can not find model.";

    if (callback == undefined) {
      return new Promise(function (resolve, reject) {
        query.Create(tableName, Connection, dataObject, function (err, result) {
          if (err) reject(err);

          resolve(result);
        });
      });
    } else {
      query.Create(tableName, Connection, dataObject, callback);
    }
  };
}

Model.compile = function compile(tableName, Connection) {
  if (!Connection) throw "Can not connect to database.";
  if (!tableName) throw "Can not find model.";

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

Model.find = function find(filter, projection, callback) {
  if (typeof projection == "function") {
    callback = projection;
    projection = undefined;
  }
  let tableName = this.tableName;
  let Connection = this.Connection;

  if (!Connection) throw "Can not connect to database.";
  if (!tableName) throw "Can not find model.";

  if (callback == undefined) {
    return new Promise(function (resolve, reject) {
      query.Find(tableName, Connection, filter, projection, function (
        err,
        result
      ) {
        if (err) reject(err);

        resolve(result);
      });
    });
  } else {
    query.Find(tableName, Connection, filter, projection, callback);
  }
};

Model.findOne = function findOne(filter, projection, callback) {
  if (typeof projection == "function") {
    callback = projection;
    projection = undefined;
  }
  let tableName = this.tableName;
  let Connection = this.Connection;

  if (!Connection) throw "Can not connect to database.";
  if (!tableName) throw "Can not find model.";

  if (callback == undefined) {
    return new Promise(function (resolve, reject) {
      query.Find(tableName, Connection, filter, projection, true, function (
        err,
        result
      ) {
        if (err) reject(err);

        resolve(result);
      });
    });
  } else {
    query.Find(tableName, Connection, filter, projection, true, callback);
  }
};

Model.findOneAndDelete = function findOneAndDelete(condition, callback) {
  let tableName = this.tableName;
  let Connection = this.Connection;

  if (!Connection) throw "Can not connect to database.";
  if (!tableName) throw "Can not find model.";

  let tableField = "*";
  let filterString = "1 = 1";
  if (!helpers.isEmpty(condition))
    filterString = helpers.filterToString(Connection, condition);

  let selectString = `SELECT ${Connection.escapeId(
    tableField
  )} FROM ${Connection.escapeId(tableName)} WHERE ${Connection.escapeId(
    filterString
  )} LIMIT 1`;

  Connection.query(selectString, (error, results, fields) => {
    if (error) callback(error, null);

    let deleteString = `DELETE FROM ${Connection.escapeId(
      tableName
    )} WHERE ${Connection.escapeId(filterString)} LIMIT 1`;
    Connection.query(deleteString, (error, results, fields) => {
      if (error) callback(error);

      let resultObject = helpers.simplifyObject(results);
      if (resultObject.length == 0) {
        callback(false, {});
      } else {
        callback(false, resultObject[0]);
      }
    });
  });
};

Model.findOneAndUpdate = function findOneAndUpdate(
  condition,
  update,
  callback
) {
  let tableName = this.tableName;
  let Connection = this.Connection;

  if (!Connection) throw "Can not connect to database.";
  if (!tableName) throw "Can not find model.";

  let tableField = "*";
  let filterString = "1 = 1";
  if (!helpers.isEmpty(condition))
    filterString = helpers.filterToString(Connection, condition);

  let selectString = `SELECT ${Connection.escapeId(
    tableField
  )} FROM ${Connection.escapeId(tableName)} WHERE ${Connection.escapeId(
    filterString
  )} LIMIT 1`;

  Connection.query(selectString, (error, results, fields) => {
    if (error) callback(error, null);

    let setString = helpers.filterToString(Connection, update);
    let updateString = `UPDATE ${Connection.escapeId(
      tableName
    )} SET ${Connection.escapeId(setString)} WHERE ${Connection.escapeId(
      filterString
    )} LIMIT 1`;

    Connection.query(updateString, (error, results, fields) => {
      if (error) callback(error);

      let resultObject = helpers.simplifyObject(results);
      if (resultObject.length == 0) {
        callback(false, {});
      } else {
        callback(false, resultObject[0]);
      }
    });
  });
};

Model.findById = function findById(id, projection, callback) {
  if (typeof projection == "function") {
    callback = projection;
    projection = undefined;
  }
  let tableName = this.tableName;
  let Connection = this.Connection;

  if (!Connection) throw "Can not connect to database.";
  if (!tableName) throw "Can not find model.";

  if (callback == undefined) {
    return new Promise(function (resolve, reject) {
      query.Find(tableName, Connection, id, projection, true, function (
        err,
        result
      ) {
        if (err) reject(err);

        resolve(result);
      });
    });
  } else {
    query.Find(tableName, Connection, id, projection, true, callback);
  }
};

Model.findByIdAndDelete = function findByIdAndDelete(id, callback) {
  let tableName = this.tableName;
  let Connection = this.Connection;

  if (!Connection) throw "Can not connect to database.";
  if (!tableName) throw "Can not find model.";

  this.findOneAndDelete(id, callback);
};

Model.findByIdAndUpdate = function findByIdAndUpdate(id, update, callback) {
  let tableName = this.tableName;
  let Connection = this.Connection;

  if (!Connection) throw "Can not connect to database.";
  if (!tableName) throw "Can not find model.";

  this.findOneAndUpdate(id, update, callback);
};

Model.updateOne = function updateOne(filter, doc, callback) {
  let tableName = this.tableName;
  let Connection = this.Connection;

  if (!Connection) throw "Can not connect to database.";
  if (!tableName) throw "Can not find model.";

  if (callback == undefined) {
    return new Promise(function (resolve, reject) {
      query.Update(tableName, Connection, filter, doc, true, function (err) {
        if (err) reject(err);
      });
    });
  } else {
    query.Update(tableName, Connection, filter, doc, true, callback);
  }
};

Model.updateMany = function updateMany(filter, doc, callback) {
  let tableName = this.tableName;
  let Connection = this.Connection;

  if (!Connection) throw "Can not connect to database.";
  if (!tableName) throw "Can not find model.";

  if (callback == undefined) {
    return new Promise(function (resolve, reject) {
      query.Update(tableName, Connection, filter, doc, function (err) {
        if (err) reject(err);
      });
    });
  } else {
    query.Update(tableName, Connection, filter, doc, callback);
  }
};

Model.deleteOne = function deleteOne(filter, callback) {
  let tableName = this.tableName;
  let Connection = this.Connection;

  if (!Connection) throw "Can not connect to database.";
  if (!tableName) throw "Can not find model.";

  if (callback == undefined) {
    return new Promise(function (resolve, reject) {
      query.Delete(tableName, Connection, filter, true, function (err) {
        if (err) reject(err);
      });
    });
  } else {
    query.Delete(tableName, Connection, filter, true, callback);
  }
};

Model.deleteMany = function deleteMany(filter, callback) {
  let tableName = this.tableName;
  let Connection = this.Connection;

  if (!Connection) throw "Can not connect to database.";
  if (!tableName) throw "Can not find model.";

  if (callback == undefined) {
    return new Promise(function (resolve, reject) {
      query.Delete(tableName, Connection, filter, function (err) {
        if (err) reject(err);
      });
    });
  } else {
    query.Delete(tableName, Connection, filter, callback);
  }
};

Model.countDocuments = function countDocuments(filter, callback) {
  let tableName = this.tableName;
  let Connection = this.Connection;

  if (!Connection) throw "Can not connect to database.";
  if (!tableName) throw "Can not find model.";

  if (callback == undefined) {
    return new Promise(function (resolve, reject) {
      query.Count(tableName, Connection, filter, function (err, result) {
        if (err) reject(err);

        resolve(result);
      });
    });
  } else {
    query.Count(tableName, Connection, filter, callback);
  }
};

Model.create = function create(doc, callback) {
  let tableName = this.tableName;
  let Connection = this.Connection;

  if (!Connection) throw "Can not connect to database.";
  if (!tableName) throw "Can not find model.";

  if (callback == undefined) {
    return new Promise(function (resolve, reject) {
      query.Create(tableName, Connection, doc, function (err, result) {
        if (err) reject(err);

        resolve(result);
      });
    });
  } else {
    query.Create(tableName, Connection, doc, callback);
  }
};

module.exports = Model;
