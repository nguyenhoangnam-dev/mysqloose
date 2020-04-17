let isEmpty = function isEmpty(obj) {
  return Object.keys(obj).length === 0;
};

let filterToString = function filterToString(filter) {
  let filterString = "";
  let filterArray = [];
  for (let key in filter) {
    filterArray.push(`${key} = '${filter[key]}'`);
  }

  filterString += filterArray.join(" AND ");
  return filterString;
};

let simplifyObject = function simplifyObject(result) {
  return Object.values(JSON.parse(JSON.stringify(result)));
};

let dataDefinition = function dataDefinition(dataObject) {
  let dataString = "( ";
  let dataArray = [];
  for (let key in dataObject) {
    dataArray.push(`'${dataObject[key]}'`);
  }

  dataString += dataArray.join(", ");
  dataString += " )";
  return dataString;
};

let keyDefinition = function keyDefinition(keyObject) {
  let keyString = "( ";
  let keyArray = [];
  for (let key in keyObject) {
    keyArray.push(`${key}`);
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
