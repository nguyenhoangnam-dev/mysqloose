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

**Important:** Turn on mysql server before using

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

Models are defined through the Schema interface. Unlike mongoose, you can not define a model without mysqloose.connect

```js
mysqloose.connect(
  "mysql://<user>:<password>@<hostname>/<database_name>",
  (err) => {
    if (err) throw err;
  }
);

const Schema = mysqloose.Schema;

const UserSchema = new Schema({
  id: 'INT NOT NULL AUTO_INCREMENT PRIMARY KEY' // mysqloose do not have ObjectId yet
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

Synchronous

```js
User.find({ name: "name" }, (err, result) => {
  if (err) throw err;
  console.log(result);
});

// Must use {<somethingId>: <number>}
User.findById({ id: 1 }, "name email", (err, result) => {
  if (err) throw err;
  console.log(result);
});

User.findOne({ name: "name" }, (err, result) => {
  if (err) throw err;
  console.log(result);
});
```

Asynchronous

```js
User.find({ name: "name" })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    if (err) throw err;
  });

User.findById({ id: 1 }, "name email")
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    if (err) throw err;
  });

User.findOne({ name: "name" })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    if (err) throw err;
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

## Model API

**create( object, callback)**

**find( object, string, callback )**

**findOne( object, string, callback )**

**findOneAndUpdate( object, object, callback )**

**findOneAndDelete(object, callback )**

**findById( object, string, callback )**

**findByIdAndUpdate( object, object, callback )**

**findByIdAndDelete( object, callback )**

**updateOne( object, object, callback )**

**updateMany( object, object, callback )**

**deleteOne( object, callback)**

**deleteMany( object, callback)**
