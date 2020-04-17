const mysqloose = require("../../index");
require("dotenv/config");

mysqloose.connect(process.env.DB_CONNECTION, (err) => {
  if (err) throw err;

  console.log("Connect success !!!");
});

const Schema = mysqloose.Schema;
const userSchema = new Schema({
  id: "int not null auto_increment primary key",
  name: "varchar(120) not null",
  email: "varchar(255) not null",
  password: "varchar(60) not null",
});

module.exports = mysqloose.model("users", userSchema);
