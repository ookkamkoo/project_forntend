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

export async function getDetailconfigMember(): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

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

export async function getMembers(data :any): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    let dateStart = dayjs(data.dateStart).format('YYYY-MM-DD');
    let timeStart = dayjs(data.timeStart).format('HH:mm:ss');
    let dateEnd = dayjs(data.dateEnd).format('YYYY-MM-DD');
    let timeEnd = dayjs(data.timeEnd).format('HH:mm:ss');
    const queryParams = [
        `sl_type=${data.sl_type}`,
        `sl_search=${data.sl_search}`,
        `data_search=${data.data_search}`,
        `find_bank_no=${data.find_bank_no}`,
        `bank=${data.bank}`,
        `market=${data.market}`,
        `dateStart=${dateStart}`,
        `timeStart=${timeStart}`,
        `dateEnd=${dateEnd}`,
        `timeEnd=${timeEnd}`,
        `page=${data.page}`,
        `pageSize=${data.pageSize}`
      ];
      const search = queryParams.join('&');

    try {
        const response = await axios.get<getResponse>(`${url}/member/getMember?`+search, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function fetchBankServices(): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.get<getResponse>(`${url}/bank/bank-detail`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function getBackListServices(data: any): Promise<getResponse> {
  const config = useRuntimeConfig()
  const url = config.public.serviceUrls;

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
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

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
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

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

export async function resetPasswordMemberServices(id: number): Promise<getResponse> {
    const config = useRuntimeConfig()
    const url = config.public.serviceUrls;
  
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
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
    const body: createMemberSent = {
        username: data.username,
        password: data.password,
        firstname: data.firstName,
        lastname: data.lastName,
        nameCheck:  data.nameCheck,
        marketing_id: data.marketingId,
        line_id: data.lineId,
        bank_id: data.bankId,
        bank_no: data.bankNo,
        bank_true_id: data.bankTrueId,
        bank_true_no: data.bankTrueNo,
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
  const config = useRuntimeConfig();
  const url = config.public.serviceUrls;
  const headers = {
      Authorization: `Bearer ${getToken()}`
  };
  const body: editMemberSent = {
      username: data.username,
      password: '',
      firstname: data.firstName,
      lastname: data.lastName,
      nameCheck:  data.nameCheck,
      marketing_id: data.marketingId,
      line_id: data.lineId,
      bank_id: data.bankId,
      bank_no: data.bankNo,
      bank_true_id: data.bankTrueId,
      bank_true_no: data.bankTrueNo,
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
    const config = useRuntimeConfig()
    const url = config.public.serviceUrls;
  
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

export async function getDetailMemberById(id:number): Promise<getResponse> {
    const config = useRuntimeConfig()
    const url = config.public.serviceUrls;
  
    const headers = {
      Authorization: `Bearer ${getToken()}`
    };
  
    try {
      const response = await axios.get<getResponse>(`${url}/member/detailById/${id}`, { headers });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
}

export async function getDetailMemberByName(name:string): Promise<getResponse> {
  const config = useRuntimeConfig()
  const url = config.public.serviceUrls;

  const headers = {
    Authorization: `Bearer ${getToken()}`
  };

  try {
    const response = await axios.get<getResponse>(`${url}/member/detailByName/${name}`, { headers });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function getTurnMemberServices(id:number): Promise<getResponse> {
  const config = useRuntimeConfig()
  const url = config.public.serviceUrls;

  const headers = {
    Authorization: `Bearer ${getToken()}`
  };

  try {
    const response = await axios.get<getResponse>(`${url}/member/getTurnMember/${id}`, { headers });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function getCreditTransactionServices(id:number): Promise<getResponse> {
  const config = useRuntimeConfig()
  const url = config.public.serviceUrls;

  const headers = {
    Authorization: `Bearer ${getToken()}`
  };

  try {
    const response = await axios.get<getResponse>(`${url}/member/getCreditTransaction/${id}`, { headers });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function getDepositServices(data :any): Promise<getResponse> {
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
      `sl_type=${data.sl_type}`,
      `de_type=${data.de_type}`,
      `username=${data.username}`,
      `adminName=${data.adminName}`,
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
    const response = await axios.get<getResponse>(`${url}/member/getDeposit?`+search , { headers });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function getWithdrawServices(data :any): Promise<getResponse> {
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
      `sl_type=${data.sl_type}`,
      `username=${data.username}`,
      `adminName=${data.adminName}`,
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
    const response = await axios.get<getResponse>(`${url}/member/getWithdraw?`+search, { headers });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function getMemberSearchServices(id:number,val:string): Promise<getResponse> {
  const config = useRuntimeConfig()
  const url = config.public.serviceUrls;

  const headers = {
    Authorization: `Bearer ${getToken()}`
  };
  try {
    const response = await axios.get<getResponse>(`${url}/member/getMemberSearch/${id}?search=${val}`, { headers });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}


