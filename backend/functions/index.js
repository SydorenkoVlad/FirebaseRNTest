const functions = require('firebase-functions');
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(cors({ origin: true }));

const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'instance256@gmail.com',
        pass: 'hierarchy69',
    },
});

const APP_NAME = 'Cloud Storage for Firebase quickstart';

async function sendWelcomeEmail(email, name) {
    const mailOptions = {
        from: `${APP_NAME} <noreply@firebase.com>`,
        to: email,
    };

    const appStoreLink = 'https://www.apple.com/ru/airpods/';

    mailOptions.subject = `Welcome to ${APP_NAME}!`;
    mailOptions.text = `Hey ${name || ''}! Welcome to ${APP_NAME}. I hope you will enjoy our service. Go to the Appstore and download the app ${appStoreLink}`;

    await mailTransport.sendMail(mailOptions);

    return null;
}

// https://us-central1-fir-test-286d1.cloudfunctions.net/sendInvite

app.post('/', (req, res) => {

    const { email, name } = req.body;

    try {
        sendWelcomeEmail(email, name);
        res.send('OK !');
    } catch (e) {
        res.send("Error " + e);
    }
});

exports.sendInvite = functions.https.onRequest(app); 