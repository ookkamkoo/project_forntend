import axios from 'axios';
import { getToken } from '~/auth/authToken'
import * as Constants from '../components/Constants/Constants';

export interface getResponse {
    status: string;
    data: any;
    message: string;
    time: string;
  }


export async function getSettingSpinWheelServices(): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
    
    try {
        const response = await axios.get<getResponse>(`${url}/mini-game/getSettingSpinWheel`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function saveSettingSpinWheelServices(data:any): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
    const body = {
        coin: Number(data.coin),
        spinWheel: data.spinWheel,
    };
    try {
        const response = await axios.post<getResponse>(`${url}/mini-game/editSettingSpinWheel`,body, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}