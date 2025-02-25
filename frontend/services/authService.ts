import axios from 'axios';
import { notifyStore } from '~/store/index';

export interface UserData {
    name: string;
    refkey: string;
}
export interface LoginResponse {
    token: string;
    status: string;
    message: string;
    data: UserData;
    error: string;
    time: string;
    name: string;
    username: string;
    permission: string;
  }

  export interface getResponse {
    status: string;
    data: any;
    message: string;
    time: string;
    error: string;
}

export async function login(Username: string, Password: string, Twofactor: string): Promise<LoginResponse> {
    const config = useRuntimeConfig()
    const url = config.public.serviceUrls;
    
    try {
        const response = await axios.post<LoginResponse>(`${url}/auth/login`, { Username, Password, Twofactor });
        return response.data;
    } catch (error : any) {
        return error.response.data;
    }
}

export async function checkToken(token: string): Promise<boolean> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;
    const notify = notifyStore();
  
    try {
      const { data } = await axios.post(
        `${url}/auth/check-token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // อัปเดต notify ใน store ด้วยข้อมูลจาก data.notify
      if (data.status == "success") {
        notify.setNotify(data.data.notify);
        notify.setSetting(data.data.setting);
        notify.setMemberOnline(data.data.memberOnline);
      }
  
      return true;
    } catch (error: any) {
      return false;
    }
}

export async function getSettingServices(): Promise<boolean> {
  const config = useRuntimeConfig();
  const url = config.public.serviceUrls;
  const notify = notifyStore();

  try {
    const { data } = await axios.get(
      `${url}/auth/getSetting`,
      {},
    );
    
    // อัปเดต notify ใน store ด้วยข้อมูลจาก data.notify
    if (data.status == "success") {
      notify.setSetting(data.data.setting);
    }

    return true;
  } catch (error: any) {
    return false;
  }
}

export async function setPinUser(keyRef:string,pin:string): Promise<any> {
    const config = useRuntimeConfig()
    const url = config.public.serviceUrls;
  
    const body = {
      pin:pin,
      ref_key:keyRef
    }
    try {
        const response = await axios.post<LoginResponse>(`${url}/setPinUser`, body);
        return response.data;
    } catch (error : any) {
        return error.response.data;
    }
  }
  