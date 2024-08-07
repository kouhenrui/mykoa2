import cors from '@koa/cors';

const corsOptions = {
  origin: '*', // 允许所有域名跨域请求
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
};
export default cors(corsOptions);