import axios from 'axios';
import { getToken } from '~/auth/authToken'

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




export async function getUser(): Promise<getRoleUserResponse> {
  const config = useRuntimeConfig()
  const url = config.public.serviceUrls;

  const headers = {
    Authorization: `Bearer ${getToken()}`
  };

  try {
    const response = await axios.get<getRoleUserResponse>(`${url}/user/`, { headers });
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

export async function createUser(data: userCreate): Promise<getRoleUserResponse> {
  const config = useRuntimeConfig()
  const url = config.public.serviceUrls;

  const body: userCreate = {
    "name": data.name,
    "username": data.username,
    "password": data.password,
    "roleId": data.roleId
  }
  const headers = {
    Authorization: `Bearer ${getToken()}`
  };

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

export async function editUser(data: userEdit): Promise<getRoleUserResponse> {
  const config = useRuntimeConfig()
  const url = config.public.serviceUrls;

  const body: userCreate = {
    "name": data.name,
    "username": data.username,
    "password": data.password,
    "roleId": data.roleId
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
