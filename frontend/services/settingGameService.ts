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

export async function getSettingListGameServices(): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
    
    try {
        const response = await axios.get<getResponse>(`${url}/setting-game/getGameList`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function sysDataListGameServices(data : any): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
    
    const body = {
        "image":data.image,
        "name":data.name,
        "product":data.product,
        "productCode":data.productCode,
        "provider":data.provider ? data.provider.toString() : ""
    }

    try {
        const response = await axios.post<getResponse>(`${url}/setting-game/sysncListGame`,body, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}
export async function getListGameServices(data :any): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    const queryParams = [
        `sl_type=${data.sl_type}`,
        `de_type=${data.de_type}`,
        `gameName=${data.gameName}`,
        `page=${data.page}`,
        `pageSize=${data.pageSize}`
    ];
    const search = queryParams.join('&');

    try {
        const response = await axios.get<getResponse>(`${url}/setting-game/getListGame?`+search, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function getGamePGListServices(): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
    
    try {
        const response = await axios.get<getResponse>(`${url}/pg-game/getPgList`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function setSettingGameMenu(data:any): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
    
    interface DataElement {
        id: number;
        name: string;
        priority: number;
        is_active: boolean;
    }
    
    const body: DataElement[] = data.game.map((element: any) => ({
        id: element.id,
        name: element.name,
        priority: element.priority,
        is_active: element.is_active,
    }));

    try {
        const response = await axios.post<getResponse>(`${url}/setting-game/update-gameMenu`,body, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function setSettingGame(data:any,type:string): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
    

    let body: any = {};
    data.game.forEach((element:any) => {
        if(type == element.name){
            body = element.settingGame;
            
        }
    });

    try {
        const response = await axios.post<getResponse>(`${url}/setting-game/updateGame`,body, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function setSettingGamePgServices(data:any): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.post<getResponse>(`${url}/setting-game/updateGamePG`,data, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function uploadImageGameServices(game:any,image:any): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
    console.log(game);
    console.log(image);
    
    var body = {
        "image":image
    }

    try {
        const response = await axios.post<getResponse>(`${url}/setting-game/updateImageGame/${game.id}`,body, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function uploadImageGameListServices(game:any,image:any): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
    console.log(game);
    console.log(image);
    
    var body = {
        "image":image
    }

    try {
        const response = await axios.post<getResponse>(`${url}/setting-game/updateImageGameList/${game.id}`,body, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function changeCreditPg100(credit:string): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
    
    var body = {
        "credit":String(credit)
    }

    try {
        const response = await axios.post<getResponse>(`${url}/setting-game/updateCredit`,body, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function editSettingPG100Services(data:any,number:number): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const  body = {
            "data":Number(number),
            "detail":data
        }
        const response = await axios.post<getResponse>(`${url}/pg-game/updateSettingPG`,body, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function editSettingPG100ServicesByUser(data:any,number:number,id:number): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const  body = {
            "data":number,
            "detail":data
        }
        const response = await axios.post<getResponse>(`${url}/pg-game/updateSettingPGByUser/`+id,body, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}


export async function getGamePGSettingServices(): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
    
    try {
        const response = await axios.get<getResponse>(`${url}/pg-game/getSettingPG`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function getGamePGSettingByUserServices(id:number): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
    
    try {
        const response = await axios.get<getResponse>(`${url}/pg-game/getSettingPGByUser/`+id, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}