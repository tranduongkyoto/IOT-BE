const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  data: [
    {
      date: {
        type: Date,
        required: [true, 'Please add a date'],
        enum: ['light', 'mometer'],
      },
      humidity: {
        type: Number,
        required: [true, 'Please add humidity'],
      },
      temperature: {
        type: Number,
        required: [true, 'Please add temperature'],
      },
    },
  ],
});

module.exports = mongoose.model('Log', LogSchema);
