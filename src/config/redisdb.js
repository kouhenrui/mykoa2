import Redis from 'ioredis';
import serverconfig from './serverconfig';
const redisClient = new Redis(serverconfig.redis);
console.log("redis connected success")
export default redisClient;
