import axios from 'axios';
import { getToken } from '~/auth/authToken'

export interface Response {
    status: string;
    data: any;
    message: string;
    time: string;
  }



export async function createTranferAutoServices(data: any): Promise<Response> {
    const config = useRuntimeConfig()
    const url = config.public.serviceUrls;
  
    const headers = {
      Authorization: `Bearer ${getToken()}`
    };
  
    try {
      const response = await axios.post<Response>(`${url}/tranfer-auto/create`, data, { headers });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
  
  export async function getTranferAutoServices(): Promise<Response> {
    const config = useRuntimeConfig()
    const url = config.public.serviceUrls;
  
    const headers = {
      Authorization: `Bearer ${getToken()}`
    };
  
    try {
      const response = await axios.get<Response>(`${url}/tranfer-auto/getTranferAuto`, { headers });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  export async function updateStatuTranfreServices(id:number,status: boolean): Promise<Response> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
    
    try {
        const response = await axios.post<Response>(`${url}/tranfer-auto/update-status/${id}`,{'status':status}, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function deleteTranferAutoServices(id: number): Promise<Response> {
  const config = useRuntimeConfig()
  const url = config.public.serviceUrls;

  const headers = {
    Authorization: `Bearer ${getToken()}`
  };

  try {
    const response = await axios.post<Response>(`${url}/tranfer-auto/delete/${id}`, {}, { headers });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function editTranferAutoServices(data :any): Promise<Response> {
  const config = useRuntimeConfig();
  const url = config.public.serviceUrls;

  const headers = {
      Authorization: `Bearer ${getToken()}`
  };

  try {
      const response = await axios.post<Response>(`${url}/tranfer-auto/edit/${data.id}`,data, { headers });
      return response.data;
  } catch (error: any) {
      return error.response.data;
  }
}
  