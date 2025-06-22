const mqtt = require('mqtt');
const deviceUUID = '54769dfca8d4417bb9ab6f78';

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
  client.subscribe(`robot/${deviceUUID}`, () => {
    console.log(`✅ Subscribed to robot/${deviceUUID}`);
  });
});

client.on('message', (topic, message) => {
  const data = JSON.parse(message.toString());
  console.log('📥 Received:', data);

  // Simulate processing success
  const ack = {
    status: 'success',
    receivedCommand: data.command || data.type
  };

  client.publish(`ack/${deviceUUID}`, JSON.stringify(ack), { qos: 1 });
});
