const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId

const PollSchema = new Schema({
  title: String,
  choices: [{
    value: String,
    votes: { type: Number, default: 0 }
  }],
  url: String
})

module.exports = mongoose.model('Poll', PollSchema)
