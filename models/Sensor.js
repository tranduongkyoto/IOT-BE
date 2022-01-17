const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
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
  log: {
    type: mongoose.Schema.ObjectId,
    ref: 'Log',
    required: true,
  },
  info: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Sensor', SensorSchema);
