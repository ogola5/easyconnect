import { initiateSTKPush } from './stkPush';
import { registerC2B } from './c2b';

export class EasyConnect {
    private apiKey: string;
    private baseUrl: string;

    constructor(apiKey: string, baseUrl: string = 'http://localhost:3000/api') {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    async stkPush(phone: string, amount: number, callbackUrl: string) {
        return initiateSTKPush(this.apiKey, this.baseUrl, phone, amount, callbackUrl);
    }

    async c2b(paybill: string, callbackUrl: string) {
        return registerC2B(this.apiKey, this.baseUrl, paybill, callbackUrl);
    }
}

export default EasyConnect;