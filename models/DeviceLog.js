const mongoose = require('mongoose');

const DeviceLogSchema = new mongoose.Schema({
  data: [
    {
      time: {
        type: Date,
        required: [true, 'Please add turn on time'],
      },
      status: {
        type: String,
        required: [true, 'Please add status'],
      },
    },
  ],
});

module.exports = mongoose.model('DeviceLog', DeviceLogSchema);
