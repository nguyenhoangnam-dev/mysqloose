const User = require("./src/user");
const faker = require("faker");
const assert = require("assert");

let name = faker.name.findName();
let email = faker.internet.email();
let password = faker.internet.password();

const newUser = new User({
  name,
  email,
  password,
});

newUser.save((err) => {
  if (err) throw err;
});

describe("Updating documents", () => {
  it("updates user with the name of user", (done) => {
    User.updateOne({ name }, { email: "Updated@mail.com" }, (err) => {
      if (err) throw err;

      User.findOne({ name }, (err, user) => {
        if (err) throw err;

        assert(user.email === "Updated@mail.com");
      });
    });
    done();
  });

  //   // it("deletes user with id", (done) => {
  //   //   User.UpdateMany({ id: 18 }, (err) => {
  //   //     if (err) throw err;

  //   //     User.findOne({ id: 12 }, (err, user) => {
  //   //       if (err) throw err;

  //   //       assert(user.id === undefined);
  //   //       done();
  //   //     });
  //   //   });
  //   // });
});
