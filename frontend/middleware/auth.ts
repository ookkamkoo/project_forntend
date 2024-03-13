import { checkToken } from '~/services/authService';

export default defineNuxtRouteMiddleware(async (to, from) => {
    let token: string | null = null;
    if (typeof localStorage !== 'undefined') {
        token = localStorage.getItem('token');
    }
    try {
        if (to.path !== '/') {
            if (token) {
                const check = await checkToken(token);
                if(!check){
                    localStorage.removeItem('token'); 
                    return navigateTo('/');
                }
            } else {
                return navigateTo('/');
            }
        } else {
            if (token) {
                const check = await checkToken(token);
                if(check){
                    return navigateTo('/dashboard');
                }
                localStorage.removeItem('token'); 
            }
        }
    } catch (error) {
        localStorage.removeItem('token'); 
        return navigateTo('/');
    }
});