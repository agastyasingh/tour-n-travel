require('dotenv').config();
const mailer = require("nodemailer");

module.exports.sendAnEmail = async(email, subject, name) => {
    const transporter = mailer.createTransport({
        service: "gmail.com",
        port: 465,
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD
        },
        // proxy: process.env.http_proxy || 'localhost:4000',
        secure: true
    });

    await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });

    const mailData = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Thanks for contacting us !!",
        html: `
            <h3 style="text-align: center;">Thank You ${name} for visiting !!<span style="color: red;"> Travel N Tour</span>.</h3>
            <p>Your Request: <b style="text-decoration: underline; color: royalblue;">[${subject}]</b> will be reviewed and verified shorlty.</p>
            <p>Thank You,</p>
            <p>Travel N Tour.</p>
        `
    };

    await new Promise((resolve, reject) => {
        // send mail
        transporter.sendMail(mailData, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log(info);
                resolve(info);
            }
        });
    });
};