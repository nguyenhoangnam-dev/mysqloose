const mysqloose = require("../../index");

mysqloose.connect("mysql://root:root@localhost/test", (err) => {
  if (err) throw err;

  console.log("Connect success !!!");
});

const Schema = mysqloose.Schema;
const userSchema = new Schema({
  id: "int not null auto_increment primary key",
  name: "varchar(40) not null",
  email: "varchar(255) not null",
  password: "varchar(60) not null",
});

module.exports = mysqloose.model("users", userSchema);
