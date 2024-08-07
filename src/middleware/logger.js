import fs from 'fs';
import path from 'path';
// const logStream = fs.createWriteStream(path.join(__dirname, '../../logs/access.log'), { flags: 'a' });
const logger = async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    const logMessage = `${ctx.method} ${ctx.url} - ${ctx.status} ${ms}ms\n`;

    console.log(logMessage);
    // logStream.write(logMessage);
}

export default logger;
