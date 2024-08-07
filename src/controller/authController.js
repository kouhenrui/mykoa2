import { authloginService } from "../service/authService";
import { generateCaptcha } from '../util/captcha'
import { errorResponse } from "../util/response";
export const authlogin = async (ctx) => {
    let { body } = ctx.request
    console.log(body)
    const result = await authloginService(body)
    let cap = await generateCaptcha(1)
    ctx.body = { result, cap }
}

export const wechatRedirect = async (ctx) => {
    const state = Math.random().toString(36).substring(7); // 随机字符串，防止 CSRF 攻击
    const wechatAuthUrl = `https://open.weixin.qq.com/connect/qrconnect?appid=${wechatConfig.appID}&redirect_uri=${encodeURIComponent(wechatConfig.redirectUri)}&response_type=code&scope=snsapi_login&state=${state}#wechat_redirect`;
    ctx.redirect(wechatAuthUrl);
}
export const handleWechatCallback = async (ctx) => {
    const { code, state } = ctx.query;
    if (!code) {
        throw errorResponse('Missing code parameter', 400)
        // ctx.status = 400;
        // ctx.body = errorResponse('Missing code parameter', 400);
        // return;
    }
    try {
        // 获取 access token
        const tokenResponse = await axios.get('https://api.weixin.qq.com/sns/oauth2/access_token', {
            params: {
                appid: wechatConfig.appID,
                secret: wechatConfig.appSecret,
                code,
                grant_type: 'authorization_code',
            },
        });

        const { access_token, openid } = tokenResponse.data;

        // 获取用户信息
        const userInfoResponse = await axios.get('https://api.weixin.qq.com/sns/userinfo', {
            params: {
                access_token,
                openid,
            },
        });

        const userInfo = userInfoResponse.data;

        // 在此处处理用户信息，例如创建新用户或更新现有用户
        // const user = await userService.findOrCreate(userInfo);

        ctx.body = successResponse(userInfo);
    } catch (error) {
        ctx.status = 500;
        ctx.body = errorResponse('Failed to authenticate with WeChat', 500);
    }
}