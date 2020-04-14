const User = require("./src/user");
const faker = require("faker");

describe("Creating documents", () => {
  it("creates a user", (done) => {
    const newUser = new User({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    newUser.save((err) => {
      if (err) throw err;

      done();
    });
  });
});
