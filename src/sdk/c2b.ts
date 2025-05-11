import axios from 'axios';

export async function registerC2B(
    apiKey: string,
    baseUrl: string,
    paybill: string,
    callbackUrl: string
) {
    try {
        const response = await axios.post(
            `${baseUrl}/developer/c2b`,
            { paybill, callbackUrl },
            { headers: { Authorization: `Bearer ${apiKey}` } }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`C2B registration failed: ${error.response?.data?.message || error.message}`);
        }
        throw new Error(`C2B registration failed: ${String(error)}`);
    }
}