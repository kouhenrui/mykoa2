import { errorResponse } from "../util/response"
import { verify } from "../util/crypt";
const authjwt = async (ctx, next) => {
    const token = ctx.header['Authorization']
    if (!token) {
        throw errorResponse('Authorization token is missing', 401)
    }
    const decoded = verify(token.split(' ')[1]); // Assuming the token is in the format "Bearer token"

    if (!decoded) {
        throw errorResponse('Invalid or expired token', 401)
    }

    ctx.state.user = decoded;
    await next()
}

export default authjwt