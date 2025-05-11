import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useMutation } from 'react-query';
import axios from 'axios';

const Credentials = () => {
    const [paybill, setPaybill] = useState('');
    const [apiKey, setApiKey] = useState('');

    const mutation = useMutation((data) =>
        axios.post('/api/business/credentials', data)
    );

    const handleSubmit = () => {
        mutation.mutate({ paybill, apiKey });
    };

    return (
        <Box sx={{ my: 2 }}>
            <TextField
                label="Paybill/Till Number"
                value={paybill}
                onChange={(e) => setPaybill(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" onClick={handleSubmit}>
                Save Credentials
            </Button>
        </Box>
    );
};

export default Credentials;