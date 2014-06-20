var mongoose = require('mongoose'),
    uuid = require('uuid'),
    Schema = mongoose.Schema;

var TodosSchema = new Schema({
  _id: { type: String, default: function() { return uuid.v4(); } },
  created: { type: Date, default: new Date() },
  updated: Date,
  completed: { type: Boolean, default: false },
  urgent_on: Date,
  important: { type: Boolean, default: false },
  description: String,
  user: String
}, {
  collection: 'todos'
});

module.exports = mongoose.model('Todos', TodosSchema);
