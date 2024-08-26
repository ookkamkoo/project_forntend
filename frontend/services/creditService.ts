import axios from 'axios';
import { getToken } from '~/auth/authToken'
import dayjs from 'dayjs';

export interface UserData {
    name: string;
    refkey: string;
}


export async function creditCustom(data: any): Promise<any> {
    const config = useRuntimeConfig()
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
      };
    
    // data.date = dayjs(data.date).format('YYYY-MM-DD');
    // data.time = dayjs(data.time).format('HH:mm:ss');

    try {
        const response = await axios.post<any>(`${url}/credit/credit-custom`, data,{ headers });
        return response.data;
    } catch (error : any) {
        return error.response.data;
    }
}

export async function getCreditCustomServices(data :any): Promise<any> {
    const config = useRuntimeConfig()
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
      };
    
    let dateStart = dayjs(data.dateStart).format('YYYY-MM-DD');
    let timeStart = dayjs(data.timeStart).format('HH:mm:ss');
    let dateEnd = dayjs(data.dateEnd).format('YYYY-MM-DD');
    let timeEnd = dayjs(data.timeEnd).format('HH:mm:ss');
    const queryParams = [
        `username=${data.username}`,
        `by=${data.adminName}`,
        `amount=${data.amount}`,
        `dateStart=${dateStart}`,
        `timeStart=${timeStart}`,
        `dateEnd=${dateEnd}`,
        `timeEnd=${timeEnd}`,
        `page=${data.page}`,
        `pageSize=${data.pageSize}`
      ];
      const search = queryParams.join('&');

    try {
        const response = await axios.get<any>(`${url}/credit/getCreditCustom?`+search,{ headers });
        return response.data;
    } catch (error : any) {
        return error.response.data;
    }
}