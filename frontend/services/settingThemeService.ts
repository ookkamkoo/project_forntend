import axios from 'axios';
import { getToken } from '~/auth/authToken'
import * as Constants from '../components/Constants/Constants';

export interface getResponse {
    status: string;
    data: any;
    message: string;
    time: string;
  }


export async function getSettingThemeServices(): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
    
    try {
        const response = await axios.get<getResponse>(`${url}/setting/getSettingTheme`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function saveSettingThemeServices(data:any,page:number): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    
    let setting = "play";
    let body = {};
    if(page == 1){
        body = {
            navBarColor: data.selectedGradientNavbar ? data.selectedGradientNavbar.toString() : "",
        };
    }else if(page == 2){
        body = {
            menuBarColor: data.selectedGradientMenuBar ? data.selectedGradientMenuBar.toString() : "",
        };
    }else if(page == 3){
        body = {
            sideBarColor: data.selectedGradientSideBar ? data.selectedGradientSideBar.toString() : "",
        };
    }else if(page == 4){
        body = {
            newIndexColor: data.selectedGradientNewIndex ? data.selectedGradientNewIndex.toString() : "",
        };
    }else if(page == 5){
        body = {
            popUpColor: data.selectedGradientPopup ? data.selectedGradientPopup.toString() : "",
        };
    }else if(page == 6){
        body = {
            informationColor: data.selectedGradientInformation ? data.selectedGradientInformation.toString() : "",
        };
    }

    try {
        const response = await axios.post<getResponse>(`${url}/setting/updatedTheme/${setting}`,body, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}