const mysqloose = require("../../index");
require("dotenv/config");

mysqloose.connect(process.env.DB_CONNECTION, (err) => {
  if (err) throw err;

  console.log("Connect success !!!");
});

const Schema = mysqloose.Schema;
const addressSchema = new Schema({
  address_id: "int not null auto_increment primary key",
  country: "varchar(100) not null",
  city: "varchar(100) not null",
  zip: "varchar(100) not null",
});

module.exports = mysqloose.model("address", addressSchema);
