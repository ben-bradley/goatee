var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    uuid = require('uuid');

var UserSchema = new mongoose.Schema({
  _id: { type: String, default: uuid.v4() },
  local: {
    email: String,
    password: String
  }
}, {
  collection: 'users'
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
