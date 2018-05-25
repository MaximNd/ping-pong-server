const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// static
app.use(express.static(__dirname + '/public'));

// body-parser
app.use(bodyParser.json());

// passport
const passportAuth = require('./passport');

app.use(passportAuth.initialize({}));

// database connect
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Database connection success'))
  .catch(err => console.log(`Database connection error: ${err}`));

// cors
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.get('/', (req, res) => {
  res.send('Hello, World!');
})

// routes
const { auth, users } = require('./routes/index');
const API = '/api';

app.use(API, auth);
app.use(API, users);

module.exports = app;