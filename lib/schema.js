class Schema {
  constructor(schemaObject) {
    this.schemaObject = schemaObject;
  }

  columnDefinition() {
    let schemaString = "( ";
    let schemaArray = [];
    let schemaObject = this.schemaObject;
    for (let key in schemaObject) {
      schemaArray.push(`${key} ${schemaObject[key]}`);
    }

    schemaString += schemaArray.join(", ");
    schemaString += " )";
    return schemaString;
  }
}

module.exports = Schema;
