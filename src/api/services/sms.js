const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()]
});

const AfricasTalking = require('africastalking')({
    apiKey: process.env.AFRICASTALKING_API_KEY,
    username: process.env.AFRICASTALKING_USERNAME
});
const sms = AfricasTalking.SMS;

async function sendTransactionNotification(phoneNumber, amount) {
    try {
        const response = await sms.send({
            to: [phoneNumber],
            message: `Payment of KSh ${amount} received. Thank you for using EasyConnect!`,
            from: 'EasyConnect'
        });
        logger.info('SMS sent:', response);
        return response;
    } catch (error) {
        logger.error(`SMS failed: ${error.message}`);
        throw error;
    }
}

module.exports = { sendTransactionNotification };