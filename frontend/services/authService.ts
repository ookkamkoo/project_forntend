import axios from 'axios';

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
  }

export async function login(Username: string, Password: string, Twofactor: string): Promise<LoginResponse> {
  const config = useRuntimeConfig()
//   const url = config.public.serviceUrls;
  const url = 'http://128.199.218.147:3001';
  
  const response = await axios.post<LoginResponse>(`${url}/login`, { Username, Password, Twofactor });
  return response.data;
}

export async function checkToken(token: string): Promise<boolean> {
  const config = useRuntimeConfig();
  const url = config.public.serviceUrls;

  try {
      await axios.get<{ token: string }>(
          url + '/protected',
          {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          }
      );
      return true;
  } catch (error) {
      return false;
  }
}