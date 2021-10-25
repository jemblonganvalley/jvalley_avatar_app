const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(11);

const hashPassword = (pass) => {
  return bcrypt.hashSync(pass, salt);
};

const comparePassword = (pass, prevPass) => {
  return bcrypt.compareSync(pass, prevPass);
};

module.exports = { hashPassword, comparePassword };
