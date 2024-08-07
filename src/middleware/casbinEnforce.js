import initCasbin from "../config/casbin"
import { errorResponse } from "../util/response"


const casbinEnforce=async(ctx,next)=>{
try {
    const sub=ctx.state.user
    const act=ctx.method
    const obj=ctx.path
    const result=await initCasbin.enforce(sub,obj,act)
    if (!result)throw new Error('Forbidden')
    await next()
} catch (error) {
    throw errorResponse(error.message,403)
}


}
export default casbinEnforce