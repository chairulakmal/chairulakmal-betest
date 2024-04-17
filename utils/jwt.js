const jwt = require('jsonwebtoken');

const encodeToken = (payload, secret) => jwt.sign(payload, secret);

const verifyToken = (token, secret) => jwt.verify(token, secret);

module.exports = {
  encodeToken, verifyToken,
};
