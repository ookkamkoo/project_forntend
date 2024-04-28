import axios from 'axios';
import { getToken } from '~/auth/authToken'
import dayjs, { Dayjs } from 'dayjs';
import * as Constants from '../components/Constants/Constants';

export interface getResponse {
    status: string;
    data: any;
    message: string;
    time: string;
  }

// export interface createMember {
//     username: string;
//     password: string;
//     fristName: string;
//     lastName: string;
//     marketingId: number;
//     lineId: string;
//     bankId: number;
//     bankNo: string;
//     refKey: string;
//   }

export interface dataMember {
    id:number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    marketingId: number;
    lineId: string;
    bankId: number;
    bankNo: string;
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
    marketing_id: number;
    line_id: string;
    bank_id: number;
    bank_no: string;
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
  marketing_id: number;
  line_id: string;
  bank_id: number;
  bank_no: string;
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

export async function getDetailconfigMember(): Promise<getResponse> {
  const url = process.env.SERVICEURL;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.get<getResponse>(`${url}/member/detail-config`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function getMembers(): Promise<getResponse> {
    const url = process.env.SERVICEURL;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.get<getResponse>(`${url}/member/getMember`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function getBackListServices(data: any): Promise<getResponse> {
  const url = process.env.SERVICEURL;

  const headers = {
    Authorization: `Bearer ${getToken()}`
  };
  let dateStart = dayjs(data.dateStart).format('YYYY-MM-DD')+' '+'00:00:00';
  let dateEnd = dayjs(data.dateEnd).format('YYYY-MM-DD')+' '+'23:59:59';
  let typeSearch = Constants.optionsBlacklist[data.typeSearch-1].name
  try {
    const response = await axios.get<getResponse>(`${url}/member/getBlacklist?date_start="${dateStart}&&date_end=${dateEnd}&&typeSearch=${typeSearch}&&search=${data.search}`, { headers });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function updateStatus(id:number,status:boolean): Promise<getResponse> {
    const url = process.env.SERVICEURL;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    const body = {
        "id": id,
        "status": status,
      }

    try {
        const response = await axios.post<getResponse>(`${url}/member/update-status/${id}`,body, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function updateStatuBlacklist(id:number,status:boolean): Promise<getResponse> {
    const url = process.env.SERVICEURL;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    const body = {
        "id": id,
        "status": status,
      }

    try {
        const response = await axios.post<getResponse>(`${url}/member/update-status-blacklist/${id}`,body, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function deleteMember(id: number): Promise<getResponse> {
    const url = process.env.SERVICEURL;
  
    const headers = {
      Authorization: `Bearer ${getToken()}`
    };
  
    try {
      const response = await axios.post<getResponse>(`${url}/member/reset-password/${id}`, {}, { headers });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

export async function createMember(data:dataMember): Promise<getResponse> {
    const url = process.env.SERVICEURL;
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
    const body: createMemberSent = {
        username: data.username,
        password: data.password,
        firstname: data.firstName,
        lastname: data.lastName,
        marketing_id: data.marketingId,
        line_id: data.lineId,
        bank_id: data.bankId,
        bank_no: data.bankNo,
        key_ref: data.refKey,
        agent_id: data.agentId,
        agent_name: data.agentName,
        is_agent: data.IsAgent,
        agent_percent: data.agentPercent,
        agent_company_percent: data.AgentCompanyPercent,
        agent_type: parseInt(data.agentType),
        is_active: data.IsActive,
        is_block: data.IsBlock,
        remark_is_black: data.RemarkIsBlock,
      }
    try {
        const response = await axios.post<getResponse>(`${url}/member/create`,body, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function editMember(data:dataMember): Promise<getResponse> {
  const url = process.env.SERVICEURL;
  const headers = {
      Authorization: `Bearer ${getToken()}`
  };
  const body: editMemberSent = {
      username: data.username,
      password: '',
      firstname: data.firstName,
      lastname: data.lastName,
      marketing_id: data.marketingId,
      line_id: data.lineId,
      bank_id: data.bankId,
      bank_no: data.bankNo,
      agent_id: data.agentId,
      agent_name: data.agentName,
      is_agent: data.IsAgent,
      agent_percent: data.agentPercent,
      agent_company_percent: data.AgentCompanyPercent,
      agent_type: parseInt(data.agentType),
      is_active: data.IsActive,
      is_block: data.IsBlock,
      remark_is_black: data.RemarkIsBlock,
    }
  try {
      const response = await axios.post<getResponse>(`${url}/member/edit/${data.id}`,body, { headers });
      return response.data;
  } catch (error: any) {
      return error.response.data;
  }
}

export async function getAgent(id:number ,search: string): Promise<getResponse> {
    const url = process.env.SERVICEURL;
  
    const headers = {
      Authorization: `Bearer ${getToken()}`
    };
  
    try {
      const response = await axios.get<getResponse>(`${url}/member/search-agent/${id}/${search}`, { headers });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

export async function getDetailMember(id:number): Promise<getResponse> {
    const url = process.env.SERVICEURL;
  
    const headers = {
      Authorization: `Bearer ${getToken()}`
    };
  
    try {
      const response = await axios.get<getResponse>(`${url}/member/detail/${id}`, { headers });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
}