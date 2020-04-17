const User = require("./src/user");
const Address = require("./src/address");
const faker = require("faker");
const assert = require("assert");

let name = faker.name.findName();
let email = faker.internet.email();
let password = faker.internet.password();
let country = faker.address.country();
let city = faker.address.city();
let zip = faker.address.zipCode();

const newUser = new User({
  name,
  email,
  password,
});
newUser.save((err) => {
  if (err) throw err;
});
const newAddress = new Address({
  country,
  city,
  zip,
});
newAddress.save((err) => {
  if (err) throw err;
});

describe("Reading in 2 table documents", () => {
  it("finds user with the name of user", (done) => {
    User.findOne({ name }, (err, user) => {
      if (err) throw err;

      assert(user.name === name);
    });
    done();
  });

  it("finds address with name of city", (done) => {
    Address.findOne({ country }, (err, address) => {
      if (err) throw err;

      assert(address.country === country);
    });
    done();
  });
});
