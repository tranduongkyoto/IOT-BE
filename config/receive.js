const { receiveMessage } = require('./amqp');
const test = async () => {
  try {
    const consumeEmmitter = await receiveMessage('iot', 'led/1', 'device');
    consumeEmmitter.on('data', (message, ack) => {
      console.log('6', message);
    });
    consumeEmmitter.on('error', (error) => console.error(error));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

test();
