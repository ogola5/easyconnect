const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');

// Authentication endpoint
router.post('/login', async (req, res) => {
    // Implement login logic (validate credentials)
    // Generate JWT
    const token = jwt.sign({ userId: 'user-id', userType: 'business' }, process.env.JWT_SECRET);
    res.json({ token });
});

// Health check
router.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

module.exports = router;