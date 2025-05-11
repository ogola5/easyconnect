import axios from 'axios';

export async function initiateSTKPush(
    apiKey: string,
    baseUrl: string,
    phone: string,
    amount: number,
    callbackUrl: string
) {
    try {
        const response = await axios.post(
            `${baseUrl}/developer/stk-push`,
            { phone, amount, callbackUrl },
            { headers: { Authorization: `Bearer ${apiKey}` } }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`STK Push failed: ${error.response?.data?.message || error.message}`);
        }
        throw new Error(`STK Push failed: ${String(error)}`);
    }
}