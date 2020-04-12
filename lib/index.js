const schemaClass = require("./schema");

function mysqler() {
  const _this = this;
  this.Schema = schemaClass;
}

module.exports = mysqler;
