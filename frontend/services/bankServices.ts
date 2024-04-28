import axios from 'axios';
import { getToken } from '~/auth/authToken'
import * as Constants from '../components/Constants/Constants';

export interface getResponse {
        status: string;
        data: any;
        message: string;
        time: string;
    }

export async function getSystemBankServices(): Promise<getResponse> {
    const url = process.env.SERVICEURL;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.get<getResponse>(`${url}/bank/getSystemBank`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function updateStatuBankSystem(id:number,status: boolean): Promise<getResponse> {
    const url = process.env.SERVICEURL;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.post<getResponse>(`${url}/bank/update-status/${id}`,{'status':status}, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}
 

export async function createBank(data :any): Promise<getResponse> {
    const url = process.env.SERVICEURL;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    const body = {
        type:Constants.optionsBankType[data.bank_type-1].labelEN,
        bank_short:Constants.optionsBankType[data.bank_type-1].bank[data.bank_list-1].short,
        bank_type:Constants.optionsBankType[data.bank_type-1].bank[data.bank_list-1].action[data.bank_list_api-1].name,
        name:data.bankName,
        book_number:data.bankNo,
        image:data.image,
        detail:{
            bankPin:data.bankPin,
            devicesID:data.devicesID,
            keyID:data.keyID,
            TureID:data.TureID,
            Username:data.Username,
            Password:data.Password,
        },
    };

    try {
        const response = await axios.post<getResponse>(`${url}/bank/create`,body, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function editSystemBank(data :any): Promise<getResponse> {
    const url = process.env.SERVICEURL;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    const body = {
        type:Constants.optionsBankType[data.bank_type-1].labelEN,
        bank_short:Constants.optionsBankType[data.bank_type-1].bank[data.bank_list-1].short,
        bank_type:Constants.optionsBankType[data.bank_type-1].bank[data.bank_list-1].action[data.bank_list_api-1].name,
        name:data.bankName,
        book_number:data.bankNo,
        image:data.image,
        detail:{
            bankPin:data.bankPin,
            devicesID:data.devicesID,
            keyID:data.keyID,
            TureID:data.TureID,
            Username:data.Username,
            Password:data.Password,
        },
    };

    try {
        const response = await axios.post<getResponse>(`${url}/bank/edit/${data.id}`,body, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function deleteBankSystemServices(id: number): Promise<getResponse> {
    const url = process.env.SERVICEURL;
  
    const headers = {
      Authorization: `Bearer ${getToken()}`
    };
  
    try {
      const response = await axios.post<getResponse>(`${url}/bank/delete/${id}`, {}, { headers });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }