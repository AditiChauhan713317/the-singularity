// utils/redisClient.js

import { createClient } from 'redis';

const redisClient = createClient();

redisClient.on('error', (err) => console.error('Redis Error:', err));

await redisClient.connect(); // or put inside an async init function if needed

export default redisClient;
