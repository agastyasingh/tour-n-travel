const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Provided default']
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {timestamps: true});

TodoSchema.plugin(findOrCreate);

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
