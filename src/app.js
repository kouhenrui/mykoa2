import Koa from 'koa';

import body from 'koa-body';
import serve from 'koa-static';
import { router, router2 } from './route';
import logger from './middleware/logger';
import responseFormatter from './middleware/responseFormatter';
import authjwt from './middleware/auth';
import path from 'path';
const app = new Koa();

app.use(responseFormatter)
app.use(logger);
// app.use(authjwt)
//app.use(casbinEnforce)
app.use(body({
  multipart: true, // 如果需要处理文件上传
  formidable: {
    uploadDir: path.join(__dirname, '../uploads'), // 上传文件的目录
    keepExtensions: true // 保持文件扩展名
  }
}));
app.use(serve(path.join(__dirname, 'public')));
app.use(router.routes()).use(router.allowedMethods())

export default app