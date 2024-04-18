const bcrypt = require('bcrypt');

const hashPassword = (password) => bcrypt.hashSync(password, 12);

const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = {
  hashPassword, comparePassword,
};
