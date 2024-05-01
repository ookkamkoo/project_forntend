import axios from 'axios';
import { getToken } from '~/auth/authToken'
import * as Constants from '../components/Constants/Constants';

export interface getResponse {
    status: string;
    data: any;
    message: string;
    time: string;
  }


export async function getSettingGameServices(): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
    
    try {
        const response = await axios.get<getResponse>(`${url}/setting-game/getSetting`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function updateGameServices(id:number,status: boolean): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
    
    try {
        const response = await axios.post<getResponse>(`${url}/setting-game/update-status/${id}`,{'status':status}, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function updateGameMenuServices(id:number,status: boolean): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
    
    try {
        const response = await axios.post<getResponse>(`${url}/setting-game/update-status-menu/${id}`,{'status':status}, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}
