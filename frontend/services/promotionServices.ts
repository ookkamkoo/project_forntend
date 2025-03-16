import axios from 'axios';
import { getToken } from '~/auth/authToken'

export interface getResponse {
    status: string;
    data: any;
    message: string;
    time: string;
  }

  export interface PromotionResponse {
    data: {
      data: any;          
      records_total: number;
    };
    message: string;
    status: string;
    time: string;
  }

export async function getPromotion(): Promise<PromotionResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.get<PromotionResponse>(`${url}/promotion/getPromotion`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function updateStatuPromotion(id:number,status: boolean): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.post<getResponse>(`${url}/promotion/update-status/${id}`,{'status':status}, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function createPromotion(data :any): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    var ConditionData = '';
    if(data.typeDeposit == '1'){
        ConditionData = data.additionalColumns;
    }else if(data.typeDeposit == '2'){
        ConditionData = data.additionalColumnsFix;
    }else if(data.typeDeposit == '3'){
        ConditionData = data.additionalColumnsScale;
    }

    var OpenData = '';
     if(data.dayOpen == '2'){
        OpenData = data.week;
    }else if(data.dayOpen == '3'){
        OpenData = data.day;
    }

    const body = {
        name: data.name,
        type: parseInt(data.type,10),
        bonusType: parseInt(data.bonusType,10),
        bonusWithdraw: parseInt(data.bonusWithdraw,10),
        typeOpen: parseInt(data.dayOpen,10),
        OpenData:OpenData,
        timeOpenClose: parseInt(data.timeOpen,10),
        time:data.time,
        lowDeposit:data.lowDeposit,
        limitRound:data.limitRound,
        typeDeposit:parseInt(data.typeDeposit,10),
        typeMaxWithDrow:parseInt(data.typeMaxWithDrow,10),
        ConditionData:ConditionData,
        limitGame:data.limitGame,
        settingPG:data.settingPG,
        active:data.active,
        turn:data.turn,
        image:data.image
    };

    try {
        const response = await axios.post<getResponse>(`${url}/promotion/create`,body, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function editPromotion(data :any): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    var ConditionData = '';
    if(data.typeDeposit == '1'){
        ConditionData = data.additionalColumns;
    }else if(data.typeDeposit == '2'){
        ConditionData = data.additionalColumnsFix;
    }else if(data.typeDeposit == '3'){
        ConditionData = data.additionalColumnsScale;
    }

    var OpenData = '';
     if(data.dayOpen == '2'){
        OpenData = data.week;
    }else if(data.dayOpen == '3'){
        OpenData = data.day;
    }

    const body = {
        name: data.name,
        type: parseInt(data.type,10),
        bonusType: parseInt(data.bonusType,10),
        bonusWithdraw: parseInt(data.bonusWithdraw,10),
        typeOpen: parseInt(data.dayOpen,10),
        OpenData:OpenData,
        timeOpenClose: parseInt(data.timeOpen,10),
        time:data.time,
        lowDeposit:parseInt(data.lowDeposit,10),
        limitRound:parseInt(data.limitRound,10),
        typeDeposit:parseInt(data.typeDeposit,10),
        typeMaxWithDrow:parseInt(data.typeMaxWithDrow,10),
        ConditionData:ConditionData,
        limitGame:data.limitGame,
        settingPG:data.settingPG,
        active:data.active,
        turn:data.turn,
        image:data.image
    };

    try {
        const response = await axios.post<getResponse>(`${url}/promotion/edit/${data.id}`,body, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function deletePromotion(id: number): Promise<getResponse> {
    const config = useRuntimeConfig()
    const url = config.public.serviceUrls;
  
    const headers = {
      Authorization: `Bearer ${getToken()}`
    };
  
    try {
      const response = await axios.post<getResponse>(`${url}/promotion/delete/${id}`, {}, { headers });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }