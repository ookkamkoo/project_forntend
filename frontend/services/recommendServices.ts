import axios from 'axios';
import { getToken } from '~/auth/authToken'
import dayjs, { Dayjs } from 'dayjs';

export interface Data {
    id: number;
    send_id: number;
    receive_id: number;
    username_send_id: string;
    username_receive_id: string;
    amount: number;
    bonus: number;
    amount_total: number;
    percent: number;
    refund_amount: number;
    date: string;
    status: number;
    created_by: number;
    created_at: string;
    updated_by: number;
    updated_at: string;
  }
  
export interface ApiResponse {
    data: Data;
    message: string;
    status: string;
    time: string;
  }

export async function getRecommendServices(data :any): Promise<any> {
    const config = useRuntimeConfig()
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
      };

    let dateStart = dayjs(data.dateStart).format('YYYY-MM-DD');
    let timeStart = dayjs(data.timeStart).format('HH:mm:ss');
    let dateEnd = dayjs(data.dateEnd).format('YYYY-MM-DD');
    let timeEnd = dayjs(data.timeEnd).format('HH:mm:59');
    const queryParams = [
        `username=${data.username}`,
        `usernameRecommend=${data.usernameRecommend}`,
        `status=${data.status}`,
        `dateStart=${dateStart}`,
        `timeStart=${timeStart}`,
        `dateEnd=${dateEnd}`,
        `timeEnd=${timeEnd}`,
        `page=${data.page}`,
        `pageSize=${data.pageSize}`
      ];
      const search = queryParams.join('&');

    try {
        const response = await axios.get<any>(`${url}/recommend/getRecommend?`+search,{ headers });
        return response.data;
    } catch (error : any) {
        return error.response.data;
    }
}