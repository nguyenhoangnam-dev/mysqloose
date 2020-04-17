const User = require("./src/user");
const faker = require("faker");
const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

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

describe("Reading documents promise", () => {
  // it("finds user with the name of user", () => {
  //   let result = User.findOne({ name });
  //   return expect(result).to.eventually.eql({ name, email, password });
  // });

  // it("finds all users", () => {
  //   let result = User.find({});
  //   return expect(result).to.eventually.eql({ name, email, password });
  // });

  it("finds user with the id of user", () => {
    let result = User.findById({ id: 3 });
    return expect(result).to.eventually.eql({
      id: 3,
      name: "Allen Christiansen",
      email: "Maxwell60@gmail.com",
      password: "7IjamuikVErd8wf",
    });
  });
});
