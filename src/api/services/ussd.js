const winston = require('winston');
const mongoose = require('mongoose');
const Transaction = require('../../models/Transaction');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()]
});

if (!process.env.AFRICASTALKING_API_KEY || !process.env.AFRICASTALKING_USERNAME) {
    logger.error('Africa’s Talking credentials missing');
    throw new Error('AFRICASTALKING_API_KEY and AFRICASTALKING_USERNAME must be set in .env');
}

const AfricasTalking = require('africastalking')({
    apiKey: process.env.AFRICASTALKING_API_KEY,
    username: process.env.AFRICASTALKING_USERNAME
});

const ussd = async (sessionId, serviceCode, phoneNumber, text) => {
    let response = '';
    try {
        if (text === '') {
            response = 'CON Welcome to M-Pesa EasyConnect\n1. Check Balance\n2. View Transactions';
        } else if (text === '1') {
            response = 'END Your balance is KSh 0.00'; // Replace with MongoDB query
        } else if (text === '2') {
            const transactions = await Transaction.find({ phoneNumber })
                .sort({ createdAt: -1 })
                .limit(3);
            if (transactions.length === 0) {
                response = 'END No recent transactions';
            } else {
                response = 'END Recent Transactions:\n';
                transactions.forEach((tx, i) => {
                    response += `${i + 1}. KSh ${tx.amount} - ${tx.status}\n`;
                });
            }
        }
    } catch (error) {
        logger.error(`USSD error: ${error.message}`);
        response = 'END An error occurred. Please try again.';
    }
    return response;
};

module.exports = { ussd };