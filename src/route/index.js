import Router from 'koa-router';
import { successResponse } from '../util/response';
import { Error } from 'mongoose';
import { authRouter, uploadRouter } from './api';
// import { getAllUsers, createUser } from '../controllers/userController.js';

const router = new Router({ prefix: "/api/v1" });
const router2 = new Router({ prefix: "/api/v2" })
router.get("/ping", async (ctx) => {
    ctx.body = successResponse("succ")
})
router.get("/pong", async (ctx) => {
    ctx.throw(500, "1")
    // throw new Error("interface error")
})
router.use(uploadRouter.routes(), uploadRouter.allowedMethods())
router.use(authRouter.routes(),authRouter.allowedMethods())
export { router, router2 };
