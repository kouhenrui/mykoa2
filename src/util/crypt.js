import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import serverconfig from '../config/serverconfig'
export {
    makeSlt, hashPwd,randomath,
    sign, verify, decode
}
const makeSlt = async (round) => {
    return bcrypt.genSaltSync(round || 10)
}
const hashPwd = async (pwd, salt) => {
    return bcrypt.hashSync(pwd, salt)
}

const randomath = async () => {
    const min = Math.pow(10, 3); // 最小4位数：10000
    const max = Math.pow(10, 4) - 1; // 最大6位数：9999
    return Math.floor(min + Math.random() * (max - min + 1));
}


const sign = async (payload, options) => {
    return jsonwebtoken.sign(payload, serverconfig.secret, { expiresIn: options.time })
}

const verify = async (token) => {
    return jsonwebtoken.verify(token, serverconfig.secret)
}

const decode = async (token) => {
    return jsonwebtoken.decode(token, serverconfig.secret)
}