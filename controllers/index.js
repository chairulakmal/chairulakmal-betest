const User = require('../models/User');
const { client, invalidateAll } = require('../utils/caching');
const { encodeToken } = require('../utils/auth');
const { comparePassword, hashPassword } = require('../utils/bcrypt');

// Authenticate a user
exports.login = async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName }).select('+password');

  if (user && password && comparePassword(password, user.password)) {
    // eslint-disable-next-line no-underscore-dangle
    const token = encodeToken({ id: user._id });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid userName or password' });
  }
};

// Create a user
exports.createUser = async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    const user = savedUser.toObject();

    delete user.password;
    res.status(201).json(user);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

// Get a user by database ID
exports.getUserById = async (req, res, next) => {
  try {
    const cachedUser = await client.hGet('user:id', req.params.userId);

    if (cachedUser) {
      res.json(JSON.parse(cachedUser));
    } else {
      const user = await User.findById(req.params.userId);
      if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
      }
      await client.HSET('user:id', req.params.userId, JSON.stringify(user), 'EX', 3600);
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
};

// Get a user by accountNumber
exports.getUserByAccountNumber = async (req, res, next) => {
  try {
    const cachedUser = await client.hGet('user:accountNumber', req.params.accountNumber);

    if (cachedUser) {
      res.json(JSON.parse(cachedUser));
    } else {
      const user = await User.findOne({ accountNumber: req.params.accountNumber });
      if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
      }
      await client.HSET('user:accountNumber', req.params.accountNumber, JSON.stringify(user), 'EX', 3600);
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
};

// Get a user by identityNumber
exports.getUserByIdentityNumber = async (req, res, next) => {
  try {
    const cachedUser = await client.hGet('user:identityNumber', req.params.identityNumber);

    if (cachedUser) {
      res.json(JSON.parse(cachedUser));
    } else {
      const user = await User.findOne({ identityNumber: req.params.identityNumber });
      if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
      }
      await client.HSET('user:identityNumber', req.params.identityNumber, JSON.stringify(user), 'EX', 3600);
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
};

// Update a user
exports.updateUser = async (req, res, next) => {
  try {
    delete req.body.password;

    // Find the user by ID
    const user = await User.findById(req.params.userId);

    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    user.set(req.body);
    const updatedUser = await user.save();

    await invalidateAll(req.userId, user);
    res.json(updatedUser);
  } catch (error) {
    if (error.status) next(error);
    else {
      error.status = 400;
      next(error);
    }
  }
};

// Delete a user
exports.deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    await invalidateAll(req.userId, deletedUser);
    res.status(204).json({ message: 'User deleted' });
  } catch (error) {
    next(error);
  }
};
