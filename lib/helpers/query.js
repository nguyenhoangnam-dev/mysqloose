const helpers = require("./helpers");

let Find = function Find(
  tableName,
  Connection,
  filter,
  projection,
  limit,
  callback
) {
  if (!Connection) throw "Can not connect to database.";
  if (!tableName) throw "Can not find model.";

  if (typeof limit == "function") {
    callback = limit;
    limit = false;
  }

  let tableField = "*";
  let filterString = "1 = 1";
  if (!helpers.isEmpty(filter))
    filterString = helpers.filterToString(Connection, filter);

  if (projection) {
    if (typeof projection == "string") {
      tableField = projection.split(" ").join(", ");
    } else throw "Set of fields must be string.";
  }

  tableField = Connection.escapeId(tableField);
  tableName = Connection.escapeId(tableName);

  let selectString = `SELECT ${tableField} FROM ${tableName} WHERE ${filterString}`;

  if (limit) selectString += " LIMIT 1";
  Connection.query(selectString, (error, results, fields) => {
    if (error) callback(error, false);

    let resultObject = helpers.simplifyObject(results);
    if (resultObject.length == 0) {
      callback(false, {});
    } else if (resultObject.length == 1) {
      callback(false, resultObject[0]);
    } else {
      callback(false, resultObject);
    }
  });
};

let Update = function Update(
  tableName,
  Connection,
  filter,
  doc,
  limit,
  callback
) {
  if (!Connection) throw "Can not connect to database.";
  if (!tableName) throw "Can not find model.";

  if (typeof doc == "function") throw "Can not update";
  if (typeof limit == "function") {
    callback = limit;
    limit = false;
  }

  tableName = Connection.escapeId(tableName);

  let filterString = "1 = 1";
  if (!helpers.isEmpty(filter))
    filterString = helpers.filterToString(Connection, filter);
  let setString = helpers.filterToString(Connection, doc);
  let updateString = `UPDATE ${tableName} SET ${setString} WHERE ${filterString}`;

  if (limit) updateString += " LIMIT 1";
  Connection.query(updateString, (error, results, fields) => {
    if (error) callback(error);

    callback(false);
  });
};

let Delete = function Delete(tableName, Connection, filter, limit, callback) {
  if (!Connection) throw "Can not connect to database.";
  if (!tableName) throw "Can not find model.";

  if (typeof limit == "function") {
    callback = limit;
    limit = false;
  }

  tableName = Connection.escapeId(tableName);

  let filterString = "1 = 1";
  if (!helpers.isEmpty(filter))
    filterString = helpers.filterToString(Connection, filter);
  let deleteString = `DELETE FROM ${tableName} WHERE ${filterString}`;

  if (limit) deleteString += " LIMIT 1";
  Connection.query(deleteString, (error, results, fields) => {
    if (error) callback(error);

    callback(false);
  });
};

let Create = function Create(tableName, Connection, doc, callback) {
  if (!Connection) throw "Can not connect to database.";
  if (!tableName) throw "Can not find model.";

  if (typeof doc == "function") throw "Can not create.";

  tableName = Connection.escapeId(tableName);

  let dataString = helpers.dataDefinition(Connection, doc);
  let keyString = helpers.keyDefinition(Connection, doc);
  let insertString = `INSERT INTO ${tableName} ${keyString} VALUES ${dataString}`;
  Connection.query(insertString, (error, results, fields) => {
    if (error) callback(error, results);

    callback(false, doc);
  });
};

let Count = function Count(tableName, Connection, filter, callback) {
  if (!Connection) throw "Can not connect to database.";
  if (!tableName) throw "Can not find model.";

  if (typeof filter == "function") throw "Can not count";

  tableName = Connection.escapeId(tableName);

  let filterString = "1 = 1";
  if (!helpers.isEmpty(filter))
    filterString = helpers.filterToString(Connection, filter);
  let countString = `SELECT COUNT(*) FROM ${tableName} WHERE ${filterString}`;

  Connection.query(countString, (error, results, fields) => {
    if (error) callback(error, results);

    let resultObject = helpers.simplifyObject(results);
    if (resultObject.length == 0) {
      callback(false, {});
    } else {
      callback(false, resultObject[0]["COUNT(*)"]);
    }
  });
};

module.exports = {
  Find,
  Update,
  Delete,
  Create,
  Count,
};
