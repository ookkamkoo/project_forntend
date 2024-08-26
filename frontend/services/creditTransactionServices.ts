import axios from 'axios';
import { getToken } from '~/auth/authToken'
import dayjs from 'dayjs';

export async function getCreditTransactionHistoryServices(data :any): Promise<any> {
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
        `sl_type=${data.sl_type}`,
        `username=${data.username}`,
        `adminName=${data.adminName}`,
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
        const response = await axios.get<any>(`${url}/member/getCreditTransaction?`+search,{ headers });
        return response.data;
    } catch (error : any) {
        return error.response.data;
    }
}

export async function getCreditTransactionHistoryByIdServices(data :any,id :number): Promise<any> {
    const config = useRuntimeConfig()
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
      };
    
    const queryParams = [
    `page=${data.page}`,
    `pageSize=${data.pageSize}`
    ];
    const search = queryParams.join('&');

    try {
        const response = await axios.get<any>(`${url}/member/getCreditTransactionById/${id}?`+search,{ headers });
        return response.data;
    } catch (error : any) {
        return error.response.data;
    }
}
