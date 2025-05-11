const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store hashed password
    userType: { type: String, enum: ['developer', 'business'], required: true },
    package: { type: String, enum: ['freemium', 'standard', 'pro'], default: 'freemium' },
    apiKey: { type: String, unique: true }, // Encrypted API key
    paybillNumber: String,
    createdAt: { type: Date, default: Date.now }
});

// Encrypt API key before saving
userSchema.pre('save', function(next) {
    if (this.isModified('apiKey') && this.apiKey) {
        const key = crypto.randomBytes(32);
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        let encrypted = cipher.update(this.apiKey);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        this.apiKey = iv.toString('hex') + ':' + encrypted.toString('hex');
    }
    next();
});

module.exports = mongoose.model('User', userSchema);