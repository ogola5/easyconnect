const axios = require('axios');

class Daraja {
    constructor(consumerKey, consumerSecret) {
        this.baseUrl = 'https://sandbox.safaricom.co.ke';
        this.consumerKey = consumerKey;
        this.consumerSecret = consumerSecret;
    }

    async getAccessToken() {
        const auth = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');
        const response = await axios.get(
            `${this.baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
            { headers: { Authorization: `Basic ${auth}` } }
        );
        return response.data.access_token;
    }

    async initiateSTKPush(phone, amount, callbackUrl) {
        const token = await this.getAccessToken();
        const response = await axios.post(
            `${this.baseUrl}/mpesa/stkpush/v1/processrequest`,
            {
                BusinessShortCode: '174379',
                Password: 'your-password', // Generate dynamically
                Timestamp: new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3),
                TransactionType: 'CustomerPayBillOnline',
                Amount: amount,
                PartyA: phone,
                PartyB: '174379',
                PhoneNumber: phone,
                CallBackURL: callbackUrl,
                AccountReference: 'EasyConnect',
                TransactionDesc: 'Payment'
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    }

    async registerC2B(paybill, callbackUrl) {
        const token = await this.getAccessToken();
        const response = await axios.post(
            `${this.baseUrl}/mpesa/c2b/v1/registerurl`,
            {
                ShortCode: paybill,
                ResponseType: 'Completed',
                ConfirmationURL: callbackUrl,
                ValidationURL: callbackUrl
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    }
}

module.exports = new Daraja(process.env.DARAJA_CONSUMER_KEY, process.env.DARAJA_CONSUMER_SECRET);