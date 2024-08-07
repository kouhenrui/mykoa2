import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import serverconfig from '../config/serverconfig'
export {
    makeSlt, hashPwd,
    sign, verify,decode
}
const makeSlt = async (round) => {
    return bcrypt.genSaltSync(round || 10)
}
const hashPwd = async (pwd, salt) => {
    return bcrypt.hashSync(pwd, salt)
}


const sign = async (payload, options) => {
    return  jsonwebtoken.sign(payload, serverconfig.secret, { expiresIn: options.time })
}

const verify = async (token) => {
    return jsonwebtoken.verify(token, serverconfig.secret)
}

const decode=async (token)=>{
    return jsonwebtoken.decode(token, serverconfig.secret)
}