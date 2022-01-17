const { sendMessage } = require('./amqp');

sendMessage('iot', 'led/1', '');
