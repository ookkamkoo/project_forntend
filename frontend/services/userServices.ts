import axios from 'axios';
import { getToken } from '~/auth/authToken'
import dayjs from 'dayjs';

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

interface roleUser {
  id: number;
  name: string;
}

export interface getRoleUserResponse {
  status: string;
  data: roleUser[];
  message: string;
  time: string;
}

export interface userCreate {
  username: string;
  password: string;
  name: string;
  roleId: number;
}

export interface userEdit {
  id: number;
  username: string;
  password: string;
  name: string;
  roleId: number;
}

export interface ResponseUsers {
  status: string;
  data: any;
  message: string;
  time: string;
}



export async function getUser(): Promise<ResponseUsers> {
  const config = useRuntimeConfig()
  const url = config.public.serviceUrls;

  const headers = {
    Authorization: `Bearer ${getToken()}`
  };

  try {
    const response = await axios.get<ResponseUsers>(`${url}/user/`, { headers });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function getLogServices(data :any): Promise<ResponseUsers> {
  const config = useRuntimeConfig()
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
    const response = await axios.get<ResponseUsers>(`${url}/log?`+search, { headers });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}


export async function getRoleUserServices(): Promise<getRoleUserResponse> {
  const config = useRuntimeConfig()
  const url = config.public.serviceUrls;

  const headers = {
    Authorization: `Bearer ${getToken()}`
  };

  try {
    const response = await axios.get<getRoleUserResponse>(`${url}/user/getRole`, { headers });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function createUser(data: any): Promise<getRoleUserResponse> {
  const config = useRuntimeConfig()
  const url = config.public.serviceUrls;

  var OpenData = '';
  if(data.dayOpen == '2'){
      OpenData = data.week;
  }else if(data.dayOpen == '3'){
      OpenData = data.day;
  }

  const body = {
    "name": data.name,
    "username": data.username,
    "password": data.password,
    "roleId": data.roleId,
    "typeOpen": parseInt(data.dayOpen,10),
    "openData": OpenData,
    "timeOpenClose":parseInt(data.timeOpen,10),
    "time":data.time,
  }
  const headers = {
    Authorization: `Bearer ${getToken()}`
  };
  console.log(body);
  
  try {
    const response = await axios.post<getRoleUserResponse>(`${url}/user/create`, body, { headers });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function updateStatus(id: number, status: boolean): Promise<getRoleUserResponse> {
  const config = useRuntimeConfig()
  const url = config.public.serviceUrls;

  const body = {
    "id": id,
    "status": status,
  }
  const headers = {
    Authorization: `Bearer ${getToken()}`
  };

  try {
    const response = await axios.post<getRoleUserResponse>(`${url}/user/update-status/${id}`, body, { headers });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function updateProfile(data: any): Promise<getRoleUserResponse> {
  const config = useRuntimeConfig()
  const url = config.public.serviceUrls;

  const body = {
    "name": data.name,
    "username": data.username,
    "password_old": data.passwordOld,
    "password": data.password,
  }
  const headers = {
    Authorization: `Bearer ${getToken()}`
  };

  try {
    const response = await axios.post<getRoleUserResponse>(`${url}/user/update-profile`, body, { headers });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function deleteUser(id: number): Promise<getRoleUserResponse> {
  const config = useRuntimeConfig()
  const url = config.public.serviceUrls;

  const headers = {
    Authorization: `Bearer ${getToken()}`
  };

  try {
    const response = await axios.post<getRoleUserResponse>(`${url}/user/delete/${id}`, {}, { headers });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function editUser(data: any): Promise<getRoleUserResponse> {
  const config = useRuntimeConfig()
  const url = config.public.serviceUrls;

  var OpenData = '';
  if(data.dayOpen == '2'){
      OpenData = data.week;
  }else if(data.dayOpen == '3'){
      OpenData = data.day;
  }

  const body = {
    "name": data.name,
    "username": data.username,
    "password": data.password,
    "roleId": data.roleId,
    "typeOpen": parseInt(data.dayOpen,10),
    "openData": OpenData,
    "timeOpenClose":parseInt(data.timeOpen,10),
    "time":data.time,
  }
  const headers = {
    Authorization: `Bearer ${getToken()}`
  };

  try {
    const response = await axios.post<getRoleUserResponse>(`${url}/user/edit/${data.id}`, body, { headers });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function getPermisionByIdServices(id: number): Promise<any> {
  const config = useRuntimeConfig()
  const url = config.public.serviceUrls;

  const headers = {
    Authorization: `Bearer ${getToken()}`
  };

  try {
    const response = await axios.get<any>(`${url}/role/permission-parent/${id}`, { headers });

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function updatePermissionParent(id:number,data: any): Promise<any> {
  const config = useRuntimeConfig()
  const url = config.public.serviceUrls;

  const headers = {
    Authorization: `Bearer ${getToken()}`
  };

  try {
    const response = await axios.post<any>(`${url}/role/update-permission-parent/${id}`, { data }, { headers });

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function reset2PassUser(id:number): Promise<any> {
  const config = useRuntimeConfig()
  const url = config.public.serviceUrls;

  const headers = {
    Authorization: `Bearer ${getToken()}`
  };

  try {
    const response = await axios.post<any>(`${url}/user/reset-2pass-users/${id}`,{}, { headers });

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}
