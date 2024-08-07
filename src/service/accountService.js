import { getaccount } from "../dao/accountDao";
import redis from "../config/redisdb";
export const getaccount = async (id) => {
    redis.set("id", id)
    return await getaccount(id)
}
// export default (redis) => ({
//     async getaccount() {
//         redis.set("q",id)
//         return await getaccount(id)
//     }
// })