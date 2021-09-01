require('dotenv').config()
let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
require('./server/database/db-conn');

// ****Initialize app**********
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
 
app.use(cors());         // OK if you don't care about cookies

const personRoute = require('./server/routes/score.route')
app.use('/score', personRoute)

// test API
app.get('/test', (req, res) => {
    res.json({test: 2});
}) 

app.post('/info', (req, res) => {
  console.log("info called!")
  console.log(req.body.fname + " " + req.body.age);
})

app.get('/*', (req, res) => {
  res.sendFile('index.html', {root: '.'});
})

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});