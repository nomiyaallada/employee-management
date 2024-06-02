const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const empSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  degree: {
    type: String ,
    required: true
  },
  joiningdate: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  phoneno: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  leavecount:{
    type: Number,
    required: true
  }
  // Add more fields as needed
});

const Employee = mongoose.model('Employee', empSchema);

module.exports = Employee;
