const User = require("./src/user");

describe("Counting documents", () => {
  it("counts all users", (done) => {
    User.countDocuments({}, (err, results) => {
      if (err) throw err;
    });
    done();
  });
});
