import axios from 'axios';
import { getToken } from '~/auth/authToken'
import dayjs from 'dayjs';

export interface getResponse {
    status: string;
    data: any;
    message: string;
    time: string;
  }

export async function getReportSummaryServices(data :any): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    let dateStart = dayjs(data.dateStart).format('YYYY-MM-DD');
    let timeStart = dayjs(data.timeStart).format('HH:mm:ss');
    let dateEnd = dayjs(data.dateEnd).format('YYYY-MM-DD');
    let timeEnd = dayjs(data.timeEnd).format('HH:mm:59');
    const queryParams = [
        `dateStart=${dateStart}`,
        `timeStart=${timeStart}`,
        `dateEnd=${dateEnd}`,
        `timeEnd=${timeEnd}`,
        `page=${data.page}`,
        `pageSize=${data.pageSize}`
    ];
    const search = queryParams.join('&');

    try {
        const response = await axios.get<getResponse>(`${url}/report/getReportSummary?`+search, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function getBonusSummaryServices(data :any): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    let dateStart = dayjs(data.dateStart).format('YYYY-MM-DD');
    let timeStart = dayjs(data.timeStart).format('HH:mm:ss');
    let dateEnd = dayjs(data.dateEnd).format('YYYY-MM-DD');
    let timeEnd = dayjs(data.timeEnd).format('HH:mm:59');
    const queryParams = [
        `dateStart=${dateStart}`,
        `timeStart=${timeStart}`,
        `dateEnd=${dateEnd}`,
        `timeEnd=${timeEnd}`,
        `page=${data.page}`,
        `pageSize=${data.pageSize}`
    ];
    const search = queryParams.join('&');

    try {
        const response = await axios.get<getResponse>(`${url}/report/getBonusSummary?`+search, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function getReportDashboardSummaryServices(data :any): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    let dateStart = dayjs(data.dateStart).format('YYYY-MM-DD');
    let timeStart = dayjs(data.timeStart).format('HH:mm:ss');
    let dateEnd = dayjs(data.dateEnd).format('YYYY-MM-DD');
    let timeEnd = dayjs(data.timeEnd).format('HH:mm:59');
    const queryParams = [
        `dateStart=${dateStart}`,
        `timeStart=${timeStart}`,
        `dateEnd=${dateEnd}`,
        `timeEnd=${timeEnd}`,
        `page=${data.page}`,
        `pageSize=${data.pageSize}`
    ];
    const search = queryParams.join('&');

    try {
        const response = await axios.get<getResponse>(`${url}/report/getDashboardSummary?`+search, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function getPromotionSummaryServices(data :any): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    let dateStart = dayjs(data.dateStart).format('YYYY-MM-DD');
    let timeStart = dayjs(data.timeStart).format('HH:mm:ss');
    let dateEnd = dayjs(data.dateEnd).format('YYYY-MM-DD');
    let timeEnd = dayjs(data.timeEnd).format('HH:mm:59');
    const queryParams = [
        `dateStart=${dateStart}`,
        `timeStart=${timeStart}`,
        `dateEnd=${dateEnd}`,
        `timeEnd=${timeEnd}`,
        `page=${data.page}`,
        `pageSize=${data.pageSize}`
    ];
    const search = queryParams.join('&');

    try {
        const response = await axios.get<getResponse>(`${url}/report/getPromotionSummary?`+search, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}


