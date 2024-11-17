import axios from 'axios';
import { getToken } from '~/auth/authToken'
import dayjs from 'dayjs';

export interface getResponse {
    status: string;
    data: any;
    message: string;
    time: string;
  }

export async function getNotifyServices(): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.get<getResponse>(`${url}/notify/getNotify`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function createNotifyServices(data :any): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.post<getResponse>(`${url}/notify/create`,data, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function editNotifyServices(data :any): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.post<getResponse>(`${url}/notify/edit/${data.id}`,data, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function deleteNotifyServices(id :number): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.post<getResponse>(`${url}/notify/delete/${id}`,{}, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function updateStatuNotify(id:number,status: boolean): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.post<getResponse>(`${url}/notify/update-status/${id}`,{'status':status}, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}