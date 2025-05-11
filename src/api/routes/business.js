const express = require('express');
const router = express.Router();
const { ussd } = require('../services/ussd');
const authMiddleware = require('../middleware/auth');
const User = require('../../models/User');

router.post('/ussd', async (req, res) => {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;
    const response = await ussd(sessionId, serviceCode, phoneNumber, text);
    res.send(response);
});

router.post('/credentials', authMiddleware, async (req, res) => {
    try {
        const { paybill, apiKey } = req.body;
        await User.updateOne(
            { _id: req.user.userId },
            { paybillNumber: paybill, apiKey }
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save credentials' });
    }
});

router.get('/transactions', authMiddleware, async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.userId });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});

module.exports = router;