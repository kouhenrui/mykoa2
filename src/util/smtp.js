import serverconfig from "../config/serverconfig";
import nodemailer from 'nodemailer';

// SMTP 配置
const transporter = nodemailer.createTransport(serverconfig.smtp);

export const sendEmail = async (email,subject,text  ) => {
    try {
        const mailOption = {
            form: 'appaccount@dataworkers.com',
            to:email,
            subject,
            text
        }
        console.log(mailOption,"发送实例")
        return await transporter.sendMail(mailOption)
    } catch (error) {
        throw new Error(error.message)
    }
    
}