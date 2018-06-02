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
const { auth, users, skills, availableSkills, battleTypes, gameRooms } = require('./routes/index');
const API = '/api';

app.use(API, auth);
app.use(API, users);
app.use(API, skills);
app.use(API, availableSkills);
app.use(API, battleTypes);
app.use(API, gameRooms);

module.exports = app;