const nodemailer = require('nodemailer');
require('dotenv').config();

console.log(process.env.EMAIL_ACCOUNT);
console.log(process.env.EMAIL_PASSWORD);

const MailTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD
    }
});

module.exports = MailTransport;



