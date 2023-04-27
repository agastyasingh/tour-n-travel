const mongoose = require('mongoose');

// const moment = require('moment-timezone');
// const dateIndia = moment.tz(Date.now(), "Asia/Calcutta").format();
// console.log(dateIndia);
// console.log(Date.now());

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, 
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String
  },
  phone: {
    type: String
  }
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;
