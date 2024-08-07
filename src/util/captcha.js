import svgCaptcha from 'svg-captcha';
import redisClient from '../config/redisdb'
export const generateCaptcha = async (key) => {
    const captcha = svgCaptcha.create({
        size: 6, // 验证码长度
        ignoreChars: '0o1i', // 忽略某些字符
        noise: 3, // 干扰线条数
        color: true, // 是否彩色
        background: '#cc9966', // 背景颜色
    });
    await redis.set(key, captcha.text, 'EX', 60);//缓存一分钟
    return captcha.data;
};
export const verifyCaptcha = async (key, value) => {
    const captchaStore = redisClient.get(key)
    if (captchaStore && captchaStore == value) {
        return true
    }
    return false
}