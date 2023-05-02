const bcrypt = require("bcryptjs");

const validateInputUser = (email, password) => {
  return email && password;
};
const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password,hashedPassword);
};
module.exports = {
  validateInputUser,
  comparePassword
};
