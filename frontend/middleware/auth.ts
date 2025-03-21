import { checkToken } from '~/services/authService';
import { getToken,logout } from '~/auth/authToken';
import { Alert } from '../components/Alert/alertComponent';

export default defineNuxtRouteMiddleware(async (to, from) => {
    let token: string | null = null;
    if (typeof localStorage !== 'undefined') {
        token = getToken();
    }
    try {
        if (to.path !== '/') {
            if (token) {
                const check = await checkToken(token);
                if(!check){
                    logout()
                    return navigateTo('/');
                }
            } else {
                return navigateTo('/');
            }
        } else {
            if (token) {
                const check = await checkToken(token);
                console.log(check);
                if(check){
                    // return navigateTo('/deposit-withdraw/credit-custom');
                    // console.log(to.path);
                    
                    // return navigateTo('/setting/play');
                    return navigateTo('/dashboard');
                }else{
                    Alert("error","กรุณาเข้าสู่ระบบใหม่อีกครั้ง ใหม่อีกครั้ง.")
                    // logout();
                }
            }
        }
    } catch (error) {
        logout();
        return navigateTo('/');
    }
});