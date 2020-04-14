const User = require("./src/user");
const faker = require("faker");
const assert = require("assert");

let name = faker.name.findName();
let email = faker.internet.email();
let password = faker.internet.password();

beforeEach(() => {
  const newUser = new User({
    name,
    email,
    password,
  });

  newUser.save((err) => {
    if (err) throw err;
  });
});

describe("Reading documents", () => {
  it("finds user with the name of user", (done) => {
    User.findOne({ name }, (err, user) => {
      if (err) throw err;

      assert(user.name === name);
      done();
    });
  });

  it("finds all users", (done) => {
    User.find({}, (err, users) => {
      if (err) throw err;

      done();
    });
  });

  it("finds user with the id of user", (done) => {
    User.findById({ id: 3 }, (err, user) => {
      if (err) throw err;

      done();
    });
  });
});
