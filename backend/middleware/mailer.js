const nodemailer = require('nodemailer');
const config = require("../config.json")["MAILER"]

const transporter = nodemailer.createTransport({
    service: config['SERVICE'],
    auth: {
        user: config['EMAIL'],
        pass: config['HESLO']
    }
});

module.exports = {transporter}