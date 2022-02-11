const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
dotenv.config();
const User = require('./models/User');
const Device = require('./models/Device');
const Log = require('./models/Log');
const Sensor = require('./models/Sensor');

const Home = require('./models/Home');
const DeviceLog = require('./models/DeviceLog');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

const device = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/device.json`, 'utf-8')
);

const sensor = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/sensor.json`, 'utf-8')
);

const log = JSON.parse(fs.readFileSync(`${__dirname}/_data/log.json`, 'utf-8'));

const home = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/home.json`, 'utf-8')
);
const devicelog = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/devicelog.json`, 'utf-8')
);
const importData = async () => {
  try {
    await User.create(users);
    await DeviceLog.create(devicelog);
    await Device.create(device);
    await Log.create(log);
    await Sensor.create(sensor);
    await Home.create(home);
    console.log('Data imported ...'.green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await DeviceLog.deleteMany();
    await Device.deleteMany();
    await Log.deleteMany();
    await Sensor.deleteMany();
    await Home.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
