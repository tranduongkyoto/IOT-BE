require('dotenv').config();
const { receiveMessage, sendMessage } = require('../config/amqp');
const connectDB = require('../config/db');
const asyncHandler = require('../middlewares/async');
const Log = require('../models/Log');
const sensorTopic = 'iot.sensor';
const logId = '5d713a66ec8f2b88b8f830b8';
//connectDB();
const getSensorData = asyncHandler(async () => {
  const newLog = {
    date: new Date(),
    humidity: Math.floor(Math.random() * 20) + 5,
    temperature: Math.floor(Math.random() * 70) + 30,
  };
  sendMessage('amqp.lib', sensorTopic, newLog);
  const consumeEmmitter = await receiveMessage(
    'amqp.lib',
    sensorTopic,
    'sensor'
  );
  consumeEmmitter.on('data', async (message, ack) => {
    //const sensor = await Sensor.find({ deviceId: msg.deviceId });
    //console.log(message);
    var log = await Log.findById(logId);
    const newData = [...log.data];
    newData.push(JSON.parse(message));
    log.data = newData;
    await log.save();
  });
  consumeEmmitter.on('error', (error) => console.error(error));
  //process.exit();
});

module.exports = getSensorData;
