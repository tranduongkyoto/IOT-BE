const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Device = require('../models/Device');
const Sensor = require('../models/Sensor');
const Log = require('../models/Log');

const { sendMessage } = require('../config/amqp');
const Home = require('../models/Home');
const DeviceLog = require('../models/DeviceLog');

// @desc      Get data from device
// @route     GET /api/data/device/:id
// @access    Private/User
exports.getDeviceData = asyncHandler(async (req, res, next) => {
  const deviceId = req.params.id;
  const device = await Device.findById(deviceId).populate({
    path: 'log',
    model: DeviceLog,
  });
  const log = await Log.findById('5d713a66ec8f2b88b8f830b8');
  if (!device) {
    return next(new ErrorResponse('Not found device'));
  }
  res.status(200).json({
    success: true,
    data: device,
  });
});

// @desc      Update device status(on/off)
// @route     POST /api/data/device/:id
// @access    Private/User
exports.updateDeviceStatus = asyncHandler(async (req, res, next) => {
  const deviceId = req.params.id;
  const device = await Device.findById(deviceId).populate({
    path: 'log',
    model: DeviceLog,
  });
  if (!device) {
    return next(new ErrorResponse('Not found device'));
  }
  const deviceLog = await DeviceLog.findById('5d713a66ec8f2b88b8f830b9');

  const newData = [...device.log.data];
  const newLog = {
    time: new Date(),
    status: req.body.msg,
  };
  newData.push(newLog);
  console.log('50', newData);
  deviceLog.data = newData;
  await deviceLog.save();
  device.status = req.body.msg;
  await device.save();
  const { exchange, routingKey, msg } = req.body;
  sendMessage(exchange, routingKey, msg);
  res.status(200).json({
    success: true,
  });
});

// @desc      Get data from sensor
// @route     GET /api/data/sensor/lastest
// @access    Private/User
exports.getSensorData = asyncHandler(async (req, res, next) => {
  const sensorId = req.params.id;
  const sensor = await Sensor.findById(sensorId);
  if (!sensor) {
    return next(new ErrorResponse('Not found sensor'));
  }
  res.status(200).json({
    success: true,
    data: sensor,
  });
});

// @desc      Get lastest data from sensor
// @route     GET /api/data/lastest
// @access    Private/User
exports.getLastestSensorData = asyncHandler(async (req, res, next) => {
  const logId = '5d713a66ec8f2b88b8f830b8';
  var log = await Log.findById(logId);
  if (!log) {
    return next(new ErrorResponse('Not found log'));
  }
  res.status(200).json({
    success: true,
    data: log.data[log.data.length - 1],
  });
});
// @desc      Get data from home
// @route     GET /api/data/home/:id
// @access    Private/User
exports.getHomeData = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const home = await Home.findOne({ owner: userId })
    .populate('owner')
    .populate('device')
    .populate('sensor');
  if (!home) {
    return next(new ErrorResponse('Not found home with userId' + userId));
  }
  res.status(200).json({
    success: true,
    data: home,
  });
});
