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
  info: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  log: {
    type: mongoose.Schema.ObjectId,
    ref: 'DeviceLog',
    required: true,
  },
});

module.exports = mongoose.model('Device', DeviceSchema);
