const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'admin',
    database : 'face-recognition'
  }
});

const app = express();

app.use(express.json());
app.use(cors());

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt)) 

app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt))

app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db, bcrypt))

app.put('/image', (req, res) => image.handleImage(req, res, db, bcrypt))

app.post('/imageurl', (req, res) => image.handleApiCall(req, res))

app.listen(5000, () => console.log('App is running on port 5000'));