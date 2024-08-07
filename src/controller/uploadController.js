import path from 'path';
import fs from 'fs';
import { generateCaptcha } from '../util/captcha';
import { errorResponse } from '../util/response';

export const uploadfile = async (ctx) => {
    try {
        const { file } = ctx.request.files;
        if (!file) {
            ctx.throw(400, 'No files found');
        }
        const fileArray = Array.isArray(file) ? file : [file];
        let filename = []
        fileArray.map(file => {
            console.log(file.filepath)
            const reader = fs.createReadStream(file.filepath);
            const filePath = path.join(__dirname, '../../uploads/', file.originalFilename);
            const stream = fs.createWriteStream(filePath);
            reader.pipe(stream);
            filename.push(file.originalFilename)
            return {
                filename: file.originalFilename,
                path: filePath
            };
        });

        ctx.body = {
            status: 'success',
            message: 'File(s) uploaded successfully',
            name: filename
        };
    } catch (err) {
        console.log(err.message)
        ctx.throw(500, 'File upload failed');
    }
}
export const getCaptcha = async (ctx) => {
    try {
        const data = await generateCaptcha()
        ctx.body = data
    } catch (error) {
        ctx.throw(500, error.message);
    }
}
export const downloadfile = async (ctx) => {
    const { filename } = ctx.params;
    const filePath = path.resolve(__dirname, '../../uploads', filename);
    if (fs.existsSync(filePath)) {
        ctx.set('Content-disposition', `attachment; filename=${filename}`);
        ctx.set('Content-type', 'application/octet-stream');
        ctx.body = fs.createReadStream(filePath);
    } else {
        throw errorResponse('File not found', 404)
    }
}