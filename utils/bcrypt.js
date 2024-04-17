const bcrypt = require('bcrypt');

const encryptPassword = (password) => bcrypt.hashSync(password, 12);

const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = {
  encryptPassword, comparePassword,
};
