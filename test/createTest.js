const User = require("./src/user");
const faker = require("faker");
const assert = require("assert");

describe("Creating documents", () => {
  it("creates a user", (done) => {
    const newUser = new User({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    newUser.save((err) => {
      if (err) throw err;
    });
    done();
  });
  it("inserts a user", (done) => {
    let name = faker.name.findName();
    let email = faker.internet.email();
    let password = faker.internet.password();
    User.create(
      {
        name,
        email,
        password,
      },
      (err, result) => {
        if (err) throw err;

        assert(result.name == name);
      }
    );
    done();
  });
});
