const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let scoreSchema = new Schema({
  username: {
    type: String
  },
  clickCount: {
    type: Number
  },
  clickerCPS: {
    type: Number
  }
}, {
    collection: 'score'
  })

module.exports = mongoose.model('Score', scoreSchema)
