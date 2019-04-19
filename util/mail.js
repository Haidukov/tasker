const nodemailer = require('nodemailer');
require('dotenv').config();

const MailTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD
    }
});

module.exports = MailTransport;
