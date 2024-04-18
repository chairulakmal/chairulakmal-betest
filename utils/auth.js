const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const encodeToken = (payload) => jwt.sign(payload, secret, { expiresIn: '30d' });

// Middleware function to authenticate JWT tokens
const authenticateUser = async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.split(' ')[1];
    try {
      // Verify the token asynchronously
      const payload = jwt.verify(token, secret);
      // If token is valid, attach user information to request object
      req.userId = payload.id;
      next();
    } catch (err) {
      res.sendStatus(403); // Forbidden
    }
  } else {
    res.sendStatus(401);
  }
};

const authorizeUser = async (req, res, next) => {
  const { userId } = req;

  if (userId && userId === req.params.userId) {
    next();
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  encodeToken, authenticateUser, authorizeUser,
};
