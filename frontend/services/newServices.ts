import axios from 'axios';
import { getToken } from '~/auth/authToken'
import dayjs from 'dayjs';

export interface getResponse {
    status: string;
    data: any;
    message: string;
    time: string;
  }

export async function getNewServices(): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.get<getResponse>(`${url}/news/getNews`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function createNewServices(data :any): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.post<getResponse>(`${url}/news/create`,data, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function editNewServices(data :any): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.post<getResponse>(`${url}/news/edit/${data.id}`,data, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function deleteNewServices(id :number): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.post<getResponse>(`${url}/news/delete/${id}`,{}, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function updateStatuNews(id:number,status: boolean): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.post<getResponse>(`${url}/news/update-status/${id}`,{'status':status}, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}