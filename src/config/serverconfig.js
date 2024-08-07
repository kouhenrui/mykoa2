
const serverconfig = {
    product: 'XinJingZong',
    secret: 'bMLJS*YTxWsYs9c4',
    system_secret: 'bMLJS*YXxWsYs9c4',
    domain: 'wwww.abc.com',
    port: 9000,
    protect: {
        secret: '0#rJo&T3HxlF@DOl',
        replay: 5 * 60 * 1000, //重放攻击有效时间
    },
    casbinurl:"mongodb://192.168.245.22:27017/casbin",
    knex: {
        client: 'mysql2',
        connection: {
            host: '192.168.245.22',
            user: 'root',
            database: 'koa',
            password: '123456',
            charset: 'utf8'
        },
        debug: false,
    },
    mongo: {
        url: "mongodb://192.168.245.22:27017/my_database",
        options: {
            dbName: "",
            user: "",
            pass: "",
            autoIndex: false,
            autoCreate: false
        }
    },
    redis: {
        host: "192.168.245.22",
        port: 6379,
        password: "",
        db: 6
    },
    user: {
        session_timeout: 60, //登录session保持时间 30分钟
        last_out_line: 5, //最大离线时间
        admin_session_timeout: 10 * 60, //
        admin_last_out_line: 5, //最大离线时间
    },
    wechatConfig:{
        appID:"",
        redirectUri:"",
        appSecret: 'your_wechat_app_secret'
    }
}



export default serverconfig