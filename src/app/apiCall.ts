// utils/api.ts

import { BASE_URL } from "@/lib/utils";

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ApiCallOptions {
    method?: HttpMethod;
    data?: any;
    headers?: Record<string, string>;
    credentials?: RequestCredentials;
    next?: {
        revalidate?: number;
        tags?: string[];
    };

}

export const apiCall = async <T = any>(
    url: string,
    {
        method = 'GET',
        data,
        headers = {},
        credentials,
        next
    }: ApiCallOptions = {}
): Promise<T> => {
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        credentials,
        next
    };

    if (data && method !== 'GET') {
        options.body = JSON.stringify(data);
    }

    try {
        const res = await fetch(`${BASE_URL}/${url}`, options);
        const result = await res.json();
        if (!res.ok) {
            throw new Error(result.message || 'API call failed');
        }
        return result.data as T;
    } catch (error: any) {
        console.error(`API Error: ${method} ${url}`, error.message);
        throw error;
    }
};
