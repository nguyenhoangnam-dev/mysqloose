const User = require("./src/user");
const faker = require("faker");
const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("Creating documents with promise", () => {
  it("inserts a user", () => {
    let name = faker.name.findName();
    let email = faker.internet.email();
    let password = faker.internet.password();
    let result = User.create({
      name,
      email,
      password,
    });

    return expect(result).to.eventually.eql({ name, email, password });
  });
});
