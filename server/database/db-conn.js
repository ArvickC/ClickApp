const mongoose = require('mongoose');

const db = 'mongodb://localhost:27017/clickerapp'

//console.log("*******Mongoose!")
// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(db, {
  useNewUrlParser: true
}).then(() => {
  console.log('Database sucessfully connected!')
},
  error => {
    console.log('Could not connect to database : ' + error)
  }
)
