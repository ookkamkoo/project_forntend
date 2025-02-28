import axios from 'axios';
import { getToken } from '~/auth/authToken'
import dayjs from 'dayjs';
import * as Constants from '../components/Constants/Constants';

export interface getResponse {
    status: string;
    data: any;
    message: string;
    time: string;
  }

export interface dataMember {
    id:number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    nameCheck: string;
    usernameAgent: string;
    marketingId: number;
    lineId: string;
    bankId: number;
    bankNo: string;
    bankTrueId: number;
    bankTrueNo: string;
    refKey: string;
    agentId: number;
    agentName: string;
    IsAgent: boolean;
    agentPercent: number;
    AgentCompanyPercent: number;
    agentType: string;
    IsActive: boolean;
    IsBlock: boolean;
    RemarkIsBlock: string;
  }

export interface createMemberSent {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    nameCheck: string;
    marketing_id: number;
    line_id: string;
    bank_id: number;
    bank_no: string;
    bank_true_id: number;
    bank_true_no: string;
    key_ref: string;
    agent_id: number;
    agent_name: string;
    is_agent: boolean;
    agent_percent: number;
    agent_company_percent: number;
    agent_type: number;
    is_active: boolean;
    is_block: boolean;
    remark_is_black: string;
  }

export interface editMemberSent {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  nameCheck: string;
  marketing_id: number;
  line_id: string;
  bank_id: number;
  bank_no: string;
  bank_true_id: number;
  bank_true_no: string;
  agent_id: number;
  agent_name: string;
  is_agent: boolean;
  agent_percent: number;
  agent_company_percent: number;
  agent_type: number;
  is_active: boolean;
  is_block: boolean;
  remark_is_black: string;
}

export interface Bank {
  id: number;
  name: string;
  image: string;
  code: string;
  color: string;
  short: string;
  priority: number;
  show: boolean;
  status: boolean;
}

export interface Market {
  id: number;
  name: string;
  color: string;
  status: boolean;
}


export async function getMemberTransactionHistoryServices(data :any): Promise<getResponse> {
    const config = useRuntimeConfig()
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

  let dateStart = dayjs(data.dateStart).format('YYYY-MM-DD');
  let timeStart = dayjs(data.timeStart).format('HH:mm:ss');
  let dateEnd = dayjs(data.dateEnd).format('YYYY-MM-DD');
  let timeEnd = dayjs(data.timeEnd).format('HH:mm:59');
  const queryParams = [
      `sl_type=${data.sl_type}`,
      `dw_type=${data.dw_type}`,
      `username=${data.username}`,
      `amount=${data.amount}`,
      `dateStart=${dateStart}`,
      `timeStart=${timeStart}`,
      `dateEnd=${dateEnd}`,
      `timeEnd=${timeEnd}`,
      `page=${data.page}`,
      `pageSize=${data.pageSize}`
    ];
    const search = queryParams.join('&');

    try {
        const response = await axios.get<getResponse>(`${url}/member/getPostTransactionHistory?`+search, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function getMemberTransactionHistoryByIdServices(data :any,id :number): Promise<getResponse> {
    const config = useRuntimeConfig()
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    const queryParams = [
        `page=${data.page}`,
        `pageSize=${data.pageSize}`
      ];
      const search = queryParams.join('&');


    try {
        const response = await axios.get<getResponse>(`${url}/member/getPostTransactionHistoryById${id}?`+search, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function cancelPostServices(id :number): Promise<getResponse> {
  const config = useRuntimeConfig();
  const url = config.public.serviceUrls;

  const headers = {
      Authorization: `Bearer ${getToken()}`
  };


  try {
      const response = await axios.post<getResponse>(`${url}/post/cancal-post/${id}`,{}, { headers });
      return response.data;
  } catch (error: any) {
      return error.response.data;
  }
}

export async function addMemberToList(formData:any,id :number): Promise<getResponse> {
  const config = useRuntimeConfig();
  const url = config.public.serviceUrls;

  const headers = {
      Authorization: `Bearer ${getToken()}`
  };

  const body = {
    "memberId":formData.memberId,
    "cheangeData":formData.cheangeData
  }

  try {
      const response = await axios.post<getResponse>(`${url}/post/addMemberToPost/${id}`,body, { headers });
      return response.data;
  } catch (error: any) {
      return error.response.data;
  }
}
