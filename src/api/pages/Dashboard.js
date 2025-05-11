import React from 'react';
import { Container, Typography } from '@mui/material';
import Credentials from '../components/Credentials';
import Transactions from '../components/Transactions';

const Dashboard = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                M-Pesa EasyConnect Dashboard
            </Typography>
            <Credentials />
            <Transactions />
        </Container>
    );
};

export default Dashboard;