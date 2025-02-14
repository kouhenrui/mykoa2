import Router from 'koa-router';
import { uploadfile, getCaptcha, downloadfile } from "../controller/uploadController";
import { authlogin, test } from '../controller/authController';
import rateLimiter from '../middleware/rateLimiter'
const uploadRouter = new Router();
uploadRouter.post('/upload', uploadfile)//
uploadRouter.get('/captcha', rateLimiter(), getCaptcha)
uploadRouter.get('/download/:filename', downloadfile)
const authRouter = new Router()
authRouter.post("/auth/login", authlogin)
authRouter.post("/test",test)


export { uploadRouter, authRouter };
// uploadRouter.use('/', uploadRoutes.routes(), uploadRoutes.allowedMethods());