import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useQuery } from 'react-query';
import axios from 'axios';

const Transactions = () => {
    const { data: transactions } = useQuery('transactions', () =>
        axios.get('/api/business/transactions').then(res => res.data)
    );

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {transactions?.map((tx) => (
                    <TableRow key={tx.transactionId}>
                        <TableCell>{tx.transactionId}</TableCell>
                        <TableCell>{tx.amount}</TableCell>
                        <TableCell>{tx.phoneNumber}</TableCell>
                        <TableCell>{tx.status}</TableCell>
                        <TableCell>{new Date(tx.createdAt).toLocaleString()}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default Transactions;