import redisClient from '../config/redisdb.js';
import { errorResponse } from '../util/response.js';

const REPLAY_ATTACK_WINDOW = 300; // 5 分钟

const replayAttackProtection = async (ctx, next) => {
    const { 'x-request-id': requestId, 'x-timestamp': timestamp } = ctx.headers;

    if (!requestId || !timestamp) {
        throw new Error('Missing request ID or timestamp')
    }

    const currentTime = Math.floor(Date.now() / 1000);

    // 检查时间戳是否在允许的时间窗口内
    if (Math.abs(currentTime - timestamp) > REPLAY_ATTACK_WINDOW) {
        throw errorResponse('Request timestamp is outside of the allowable window', 400)
    }

    // 检查 Redis 中是否已存在相同的 request ID
    const exists = await redisClient.get(requestId);
    if (exists) {
        throw errorResponse('Replay attack detected', 400)
    }

    // 将 request ID 存储到 Redis 中，并设置过期时间
    await redisClient.set(requestId, '1', 'EX', REPLAY_ATTACK_WINDOW);

    await next();
};

export default replayAttackProtection;
