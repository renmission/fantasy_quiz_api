const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');

// Routers
const productRouter = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');
const userRouter = require('./routes/userRoutes');
const questionRouter = require('./routes/questionRoutes');
const resultRouter = require('./routes/resultRoutes');

const app = express();

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));

// body parser, reading data from the req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/results', resultRouter);
app.use('/api/v1/questions', questionRouter);


// handle undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

module.exports = app;
