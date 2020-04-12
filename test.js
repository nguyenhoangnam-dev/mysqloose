const mysqler = require("./index");

mysqler.connect("mysql://root:root@localhost/test", (err) => {
  if (err) throw err;

  console.log("Connect success !!!");
});

const Schema = mysqler.Schema;
const userSchema = new Schema({
  id: "int not null auto_increment primary key",
  name: "varchar(20) not null",
  email: "varchar(255) not null",
  password: "varchar(60) not null",
});

const User = mysqler.model("users", userSchema);

const newUser = new User({
  name: "abc",
  email: "def",
  password: "abcdef",
});

newUser.save((err, results) => {
  if (err) throw err;

  console.log(results);
});
