const mysqler = require("./index");

const Schema = mysqler.Schema;
const userSchema = new Schema({
  id: "int not null auto_increment primary key",
  name: "varchar(20) not null",
  email: "varchar(255) not null",
  password: "varchar(60) not null",
});

console.log(userSchema.columnDefinition());
