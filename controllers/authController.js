const User = require('../models/userModel');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const accessToken = signToken(user._id);

  res.cookie('jwt', accessToken, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  user.password = undefined;

  res.status(statusCode).json({
    accessToken,
    status: 'success',
    user,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  const newUser = await User.create({ name, email, password, confirmPassword });

  createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check email and password if exists
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 404));
  }

  // check if email and password correct
  const user = await User.findOne({ email }).select('+password');

  // correctPassword runs on model & validate password
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createSendToken(user, 200, req, res);
});

exports.logout = (req, res, next) => {
  res.cookie('jwt', 'LoggedOut', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: 'success' });
};


exports.protect = catchAsync(async(req, res, next) => {
  // get token and check if its there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
      token = req.cookies.jwt
  }

  console.log(token);

  if (!token) {
      return next(new AppError('You are not logged in. Please log in to access.', 401));
  }
  // verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);


  // check if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
      return next(new AppError('The user belongs to this token is no longer exist.', 401));
  }

  // check if user change password after token issued
  // if (currentUser.changePasswordAfter(decoded.id)) {
  //     return next(new AppError('User recently changed password. Please log in again', 401));
  // }

  // grant access
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});