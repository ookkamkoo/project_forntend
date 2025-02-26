import axios from 'axios';
import { getToken } from '~/auth/authToken'
import * as Constants from '../components/Constants/Constants';
import dayjs from 'dayjs';

export interface getResponse {
        status: string;
        data: any;
        message: string;
        time: string;
        error: string;
    }

export async function getSystemBankServices(): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

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

export async function getSystemBankByIdServices(data :any,id :string): Promise<getResponse> {
  const config = useRuntimeConfig();
  const url = config.public.serviceUrls;

  const headers = {
      Authorization: `Bearer ${getToken()}`
  };

  let dateStart = dayjs(data.dateStart).format('YYYY-MM-DD');
  let timeStart = dayjs(data.timeStart).format('HH:mm:ss');
  let dateEnd = dayjs(data.dateEnd).format('YYYY-MM-DD');
  let timeEnd = dayjs(data.timeEnd).format('HH:mm:ss');
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
      const response = await axios.get<getResponse>(`${url}/bank/getSystemBankById/${id}?`+search, { headers });
      return response.data;
  } catch (error: any) {
      return error.response.data;
  }
}

export async function updateStatuBankSystem(id:number,status: boolean,active:string): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.post<getResponse>(`${url}/bank/update-status/${id}`,{'status':status,'active':active }, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}
 

export async function createBank(data:any): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
    console.log("data sssssssssssss");
    console.log(data);
    
    const body = {
        type:Constants.optionsBankType[data.bank_type-1].labelEN,
        bank_short:Constants.optionsBankType[data.bank_type-1].bank[data.bank_list-1].short,
        bank_type:Constants.optionsBankType[data.bank_type-1].bank[data.bank_list-1].action[data.bank_list_api-1].name,
        name:data.bankName,
        book_number:data.bankNo,
        image:data.Image,
        is_api:data.is_api,
        is_qrcode:data.is_qrcode,
        is_active:data.is_active,
        is_sms:data.is_sms,
        detail:{
            bankPin:data.bankPin,
            devicesID:data.devicesID,
            loginToken:data.loginToken,
            keyID:data.keyID,
            tureID:data.TureID,
            username:data.Username,
            password:data.Password,
            apiKey:data.ApiKey,
            secretKey:data.SecretKey,
            clientId:data.ClientId,
            merchant:data.Merchant,
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
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    
    const body = {
        type:Constants.optionsBankType[data.bank_type-1].labelEN,
        bank_short:Constants.optionsBankType[data.bank_type-1].bank[data.bank_list-1].short,
        bank_type:Constants.optionsBankType[data.bank_type-1].bank[data.bank_list-1].action[data.bank_list_api-1].name,
        name:data.bankName,
        book_number:data.bankNo,
        is_api:data.is_api,
        is_qrcode:data.is_qrcode,
        is_active:data.is_active,
        is_sms:data.is_sms,
        image:data.Image,
        detail:{
            bankPin:data.bankPin,
            devicesID:data.devicesID,
            loginToken:data.loginToken,
            keyID:data.keyID,
            tureID:data.TureID,
            username:data.Username,
            password:data.Password,
            apiKey:data.ApiKey,
            secretKey:data.SecretKey,
            clientId:data.ClientId,
            merchant:data.Merchant,
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
    const config = useRuntimeConfig()
    const url = config.public.serviceUrls;
  
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

export async function CheckConnectBankSystemServices(id: number): Promise<getResponse> {
    const config = useRuntimeConfig()
    const url = config.public.serviceUrls;
  
    const headers = {
      Authorization: `Bearer ${getToken()}`
    };
  
    try {
      const response = await axios.post<getResponse>(`${url}/bank/checkBankConnect/${id}`, {}, { headers });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

export async function getStatementServices(id: number): Promise<getResponse> {
    const config = useRuntimeConfig()
    const url = config.public.serviceUrls;
  
    const headers = {
      Authorization: `Bearer ${getToken()}`
    };
  
    try {
      const response = await axios.post<getResponse>(`${url}/bank/statement/${id}`, {}, { headers });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

export async function getbankWithdrawServices(id:number): Promise<getResponse> {
    const config = useRuntimeConfig()
    const url = config.public.serviceUrls;
  
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
  
  
    try {
        const response = await axios.get<getResponse>(`${url}/bank/bank-withdraw/${id}`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
 }

 export async function confirmWithdrawServices(data: any): Promise<getResponse> {
    const config = useRuntimeConfig()
    const url = config.public.serviceUrls;
  
    const headers = {
      Authorization: `Bearer ${getToken()}`
    };
    console.log(data);
    
    const body = {
        "memberId":data.memberId,
        "bankMemberId":data.bankMemberId,
        "bankSystemId":data.bankSystemId,
        "bankSystemBankId":data.bankSystemBankId,
        "isAutoWithdraw": true
    }

    try {
      const response = await axios.post<getResponse>(`${url}/post/confirm-withdraw/${data.postId}`, body, { headers });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }


  export async function manualPostWithdrawServices(data: any): Promise<getResponse> {
    const config = useRuntimeConfig()
    const url = config.public.serviceUrls;
  
    const headers = {
      Authorization: `Bearer ${getToken()}`
    };
    console.log(data);
    
    const body = {
        "memberId":data.member_id,
        "bankMemberId":data.bank_member_id,
        "bankSystemId":data.system_id,
        "bankSystemBankId":data.bank_system_bank_id,
        "isAutoWithdraw": false
    }

    try {
      const response = await axios.post<getResponse>(`${url}/post/confirm-withdraw/${data.id}`, body, { headers });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  export async function tranferManualServices(data: any): Promise<getResponse> {
    const config = useRuntimeConfig()
    const url = config.public.serviceUrls;
  
    const headers = {
      Authorization: `Bearer ${getToken()}`
    };
    console.log(data);
    

    try {
      const response = await axios.post<getResponse>(`${url}/tranfer-auto/manual`, data, { headers });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  export async function getBankSummaryServices(data: any): Promise<getResponse> {
    const config = useRuntimeConfig()
    const url = config.public.serviceUrls;
  
    const headers = {
      Authorization: `Bearer ${getToken()}`
    };
    console.log(data);
    
    let dateStart = dayjs(data.dateStart).format('YYYY-MM-DD');
    let timeStart = dayjs(data.timeStart).format('HH:mm:ss');
    let dateEnd = dayjs(data.dateEnd).format('YYYY-MM-DD');
    let timeEnd = dayjs(data.timeEnd).format('HH:mm:ss');
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
      const response = await axios.get<getResponse>(`${url}/bank/summary?`+search, { headers });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
  