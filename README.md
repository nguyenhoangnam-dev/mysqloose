# mysqloose

> This is similar to mongoose but for mysql

_**warning:**_ _Don not use this in real project, it is unstable_

## Installation

You need: [Node.js](https://nodejs.org) installed on your machine.

To install

```bash
$ npm i mysqloose
```

## Importing

```js
const mysqloose = require("mysqloose");
```

## Overview

**Connecting to MySQL**

First, we need to define a connection.

```js
mysqloose.connect(
  "mysql://<user>:<password>@<hostname>/<database_name>",
  (err) => {
    if (err) throw err;
  }
);
```

**Defining a Model**

Models are defined through the Schema interface.

```js
const Schema = mysqloose.Schema;

const UserSchema = new Schema({
  id: 'INT NOT NULL AUTO_INCREMENT PRIMARY KEY'
  user_name: 'VARCHAR(40) NOT NULL',
  email: 'VARCHAR(255) NOT NULL',
  password: 'varchar(60) not null' // Case-insensitive
  user_type: 'varchar(5) default "user"'
});
```

**Accessing a Model**

```js
const User = mongoose.model("ModelName", UserSchema);

const newUser = new User({
  user_name: "user name",
  email: "email",
  password: "password",
});
```

**Insert**

```js
newUser.save((err) => {
  if (err) throw err;
});
```

**Select**

```js
User.find({ name: "name" }, (err, result) => {
  if (err) throw err;
  console.log(result);
});

User.findById(1, "name email", (err, result) => {
  if (err) throw err;
  console.log(result);
});

User.findOne({ name: "name" }, (err, result) => {
  if (err) throw err;
  console.log(result);
});
```

**Update**

```js
User.updateOne({ name: "name" }, { email: "new email" }, (err, result) => {
  if (err) throw err;
  console.log(result);
});
```

**Delete**

```js
User.deleteOne({ name: "name" }, (err, result) => {
  if (err) throw err;
  console.log(result);
});
```
