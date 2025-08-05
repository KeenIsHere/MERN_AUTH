import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: process.env.SMPT_USER,
        pass: process.env.SMPT_PASS,
    },

}); 

export default transporter;