const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');

const configs = require('../configs');
const loggerMiddleware = require('./middlewares/loggerMiddleware');
const initialMiddleware = require('./middlewares/initialMiddleware');

const statusController = require('./controllers/statusController');
const usersController = require('./controllers/usersController');

const app = express();
const { port } = configs.app;

//  Body parser middleware
app.use(bodyParser.json());

app.use(initialMiddleware);

// Routes
router.get('/ping', (req, res) => statusController.ping(req, res));

// Users
router.get('/users/:userId/profile', usersController.getUserProfile);

app.use(router);

app.use(loggerMiddleware);

//  Setting the invalid enpoint message for any other route
app.get('*', (req, res) => {
  res.status(400).json({ message: 'Invalid endpoint' });
});

//  Start server on port
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
