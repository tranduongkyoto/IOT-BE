const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');

const {
  getDeviceData,
  updateDeviceStatus,
  getSensorData,
  getLastestSensorData,
  getHomeData,
} = require('../controllers/data');

//router.use(protect);
router.get('/device/:id', getDeviceData);
router.post('/device/:id', updateDeviceStatus);
router.get('/sensor/:id', getSensorData);
router.get('/lastest', getLastestSensorData);
router.get('/home/:id', getHomeData);

module.exports = router;
