const redis = require('redis');
const client = redis.createClient();

const connectRedis = async () => {
    await client.connect()
}
connectRedis()
client.on('connect', function () {
    console.log('Redis Connected!!');
});

module.exports = client;