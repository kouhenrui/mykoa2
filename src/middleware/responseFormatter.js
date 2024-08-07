import { errorResponse, successResponse } from '../util/response.js';

const responseFormatter = async (ctx, next) => {
  try {
    await next();
    // 格式化响应数据
    if (ctx.body) {
      ctx.body = successResponse(ctx.body, ctx.status);
    } else {
      ctx.body = successResponse(null, ctx.status);
    }
  } catch (err) {
    console.error('Error:', err.message);
    ctx.status = err.code || 500;
    ctx.body = errorResponse(err.message, ctx.status);
  }
};

export default responseFormatter;
