const amqplib = require('amqplib');
const EventEmitter = require('events');
const amqpUrl =
  process.env.AMQP_URL ||
  'amqps://bznsuzch:XrXHRS9IYh-xvN6aywUwGRMC_Pb_c461@gerbil.rmq.cloudamqp.com/bznsuzch';

const sendMessage = async (exchange, routingKey, msg) => {
  const connection = await amqplib.connect(amqpUrl, 'heartbeat=60');
  const channel = await connection.createChannel();
  try {
    console.log('Publishing');

    await channel.assertExchange(exchange, 'topic', {
      durable: true,
    });
    await channel.publish(exchange, routingKey, Buffer.from(msg));

    console.log('Message published');
    //connection.close();
  } catch (e) {
    console.error('Error in publishing message', e);
  } finally {
    // setTimeout(function () {
    //   connection.close();
    //   //process.exit(0);
    // }, 500);
  }
};

const receiveMessage = async (exchange, routingKey, queue) => {
  const connection = await amqplib.connect(amqpUrl, 'heartbeat=60');
  const channel = await connection.createChannel();
  channel.prefetch(10);
  await channel.assertExchange(exchange, 'topic', {
    durable: true,
  });
  await channel.assertQueue(queue, {
    durable: true,
  });
  await channel.bindQueue(queue, exchange, routingKey);
  const consumeEmitter = new EventEmitter();
  var resMsg;
  try {
    channel.consume(
      queue,
      function (msg) {
        if (msg !== null) {
          //console.log(msg.content.toString());
          resMsg = msg.content.toString();
          consumeEmitter.emit('data', msg.content.toString());
        } else {
          const error = new Error('NullMessageException');
          consumeEmitter.emit('error', error);
        }
      },
      {
        noAck: true,
      }
    );
  } catch (e) {
    console.error('Error in publishing message', e);
    consumeEmitter.emit('error', e);
  } finally {
  }
  return consumeEmitter;
};

module.exports = { sendMessage, receiveMessage };
