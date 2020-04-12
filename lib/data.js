const Model = require("./model");

class Data extends Model {
  constructor(dataObject) {
    super();
    for (let key in dataObject) {
      this[key] = dataObject;
    }
  }

  save(callback) {}
}

module.exports = Data;
