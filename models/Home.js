const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    //unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters'],
  },
  location: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters'],
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  device: {
    type: mongoose.Schema.ObjectId,
    ref: 'Device',
    required: true,
  },
  sensor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Sensor',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Home', HomeSchema);
