const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const daraja = require('../services/daraja');

router.post('/stk-push', authMiddleware, async (req, res) => {
    const { phone, amount, callbackUrl } = req.body;
    try {
        const result = await daraja.initiateSTKPush(phone, amount, callbackUrl);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/c2b', authMiddleware, async (req, res) => {
    const { paybill, callbackUrl } = req.body;
    try {
        const result = await daraja.registerC2B(paybill, callbackUrl);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;