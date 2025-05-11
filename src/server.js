const path = require('path');
const dotenv = require('dotenv');
const envPath = path.resolve(__dirname, '../.env');
const result = dotenv.config({ path: envPath });

if (result.error) {
    console.error('Error loading .env:', result.error);
    process.exit(1);
}

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const winston = require('winston');
const sharedRoutes = require('./api/routes/shared');
const developerRoutes = require('./api/routes/developer');
const businessRoutes = require('./api/routes/business');

const app = express();
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()]
});

// Log environment variables for debugging
logger.info('AFRICASTALKING_API_KEY:', process.env.AFRICASTALKING_API_KEY || 'undefined');
logger.info('AFRICASTALKING_USERNAME:', process.env.AFRICASTALKING_USERNAME || 'undefined');
logger.info('MONGODB_URI:', process.env.MONGODB_URI || 'undefined');

// Middleware
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api', sharedRoutes);
app.use('/api/developer', developerRoutes);
app.use('/api/business', businessRoutes);

// Error handling
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Database connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => logger.info('Connected to MongoDB'))
.catch(err => logger.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});