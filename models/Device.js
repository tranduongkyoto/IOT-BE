const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Please add a type of divice'],
  },
  deviceId: {
    type: String,
    required: [true, 'Please add a diviceId'],
  },
  status: {
    type: String,
  },
  // timeActivity: {
  //   type: Number,
  // },
  timeUpdate: {
    type: Date,
  },
  info: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Device', DeviceSchema);
