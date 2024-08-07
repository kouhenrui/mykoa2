import redisClient from '../config/redisdb.js';
import { errorResponse } from '../util/response.js';

const rateLimiter = (keyPrefix="captcha", limit = 5, duration = 60) => {
  return async (ctx, next) => {
    const key = `${keyPrefix}_${ctx.ip}`;

    // 获取当前请求次数
    const current = await redisClient.get(key);

    if (current && current >= limit) {
      // 如果超过限制次数，返回错误响应
      ctx.status = 429;
      ctx.body = errorResponse('Too many requests, please try again later.', 429);
    } else {
      // 如果未超过限制次数，增加请求计数
      await redisClient.multi()
        .incr(key)
        .expire(key, duration)
        .exec();

      await next();
    }
  };
};

export default rateLimiter;