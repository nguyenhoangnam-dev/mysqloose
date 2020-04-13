const mysqloose = require("./index");

mysqloose.connect("mysql://root:root@localhost/test", (err) => {
  if (err) throw err;

  console.log("Connect success !!!");
});

const Schema = mysqloose.Schema;
const userSchema = new Schema({
  id: "int not null auto_increment primary key",
  name: "varchar(20) not null",
  email: "varchar(255) not null",
  password: "varchar(60) not null",
});

const User = mysqloose.model("users", userSchema);

// const newUser = new User({
//   name: "name",
//   email: "name@email.com",
//   password: "nameandemail",
// });

// newUser.save((err, results) => {
//   if (err) throw err;
// });

// @ts-ignore
// User.find({}, (err, result) => {
//   if (err) throw err;

//   console.log(result);
// });

// User.findById(2, "name email", (err, result) => {
//   if (err) throw err;

//   console.log(result);
// });

// User.findOne({}, (err, result) => {
//   if (err) throw err;

//   console.log(result);
// });

// User.updateOne({}, { email: "katy@perry.com" }, (err, result) => {
//   if (err) throw err;

//   console.log(result);
// });

// User.deleteOne({}, (err, result) => {
//   if (err) throw err;

//   console.log(result);
// });
