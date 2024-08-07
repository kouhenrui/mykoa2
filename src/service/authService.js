import { sign } from "../util/crypt"

export const authloginService=async(body)=>{
    let {email,password,captchaID,captchaContext}=body
    let signdata={email,captchaContext}
    const token=await sign(signdata,{time:"7h"})

    return token
}