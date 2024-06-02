const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leaveSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  reasontype: {
    type: String,
    enum: ['SickLeave', 'CasualLeave', 'OdLeave', 'MedicalLeave'],
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  startdate: {
    type: Date,
    required: true
  },
  enddate: {
    type: Date,
    required: true
  }
});

const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave;
