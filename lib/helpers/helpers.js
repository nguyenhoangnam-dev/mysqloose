let isEmpty = function isEmpty(obj) {
  return Object.keys(obj).length === 0;
};

let filterToString = function filterToString(Connection, filter) {
  let filterString = "";
  let filterArray = [];
  for (let key in filter) {
    let covertKey = Connection.escapeId(key);
    let coverData = Connection.escape(filter[key]);
    filterArray.push(`${covertKey} = ${coverData}`);
  }

  filterString += filterArray.join(" AND ");
  return filterString;
};

let simplifyObject = function simplifyObject(result) {
  return Object.values(JSON.parse(JSON.stringify(result)));
};

let dataDefinition = function dataDefinition(Connection, dataObject) {
  let dataString = "( ";
  let dataArray = [];
  for (let key in dataObject) {
    let covert = Connection.escape(dataObject[key]);
    dataArray.push(`${covert}`);
  }

  dataString += dataArray.join(", ");
  dataString += " )";
  return dataString;
};

let keyDefinition = function keyDefinition(Connection, keyObject) {
  let keyString = "( ";
  let keyArray = [];
  for (let key in keyObject) {
    let covert = Connection.escapeId(key);
    keyArray.push(`${covert}`);
  }

  keyString += keyArray.join(", ");
  keyString += " )";
  return keyString;
};

module.exports = {
  isEmpty,
  filterToString,
  simplifyObject,
  dataDefinition,
  keyDefinition,
};
