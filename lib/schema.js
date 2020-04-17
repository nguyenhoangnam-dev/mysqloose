function Schema(schemaObject) {
  if (!(this instanceof Schema)) {
    return new Schema(schemaObject);
  }

  this.schemaObject = schemaObject;

  this.columnDefinition = function columnDefinition() {
    let schemaString = "( ";
    let schemaArray = [];
    let schemaObject = this.schemaObject;
    for (let key in schemaObject) {
      schemaArray.push(`${key} ${schemaObject[key]}`);
    }

    schemaString += schemaArray.join(", ");
    schemaString += " )";
    return schemaString;
  };
}

module.exports = Schema;
