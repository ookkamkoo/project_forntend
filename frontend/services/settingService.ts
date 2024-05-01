import axios from 'axios';
import { getToken } from '~/auth/authToken'
import * as Constants from '../components/Constants/Constants';

export interface getResponse {
    status: string;
    data: any;
    message: string;
    time: string;
  }


export async function getSettingServices(): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
    
    try {
        const response = await axios.get<getResponse>(`${url}/setting/getSetting`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function setSetting(data:any,page:string): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.serviceUrls;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
    
    let setting = '';
    let body = {};
    if(page == '1'){
        setting = "website";
        body = {
            title: data.titleWebsite ? data.titleWebsite.toString() : "",
            description: data.discriptionsWebsite ? data.discriptionsWebsite.toString() : "",
            keyword: data.websiteKeyword ? data.websiteKeyword.toString() : "",
            websiteUrl: data.websiteUrl ? data.websiteUrl.toString() : "",
            websiteLine: data.websiteLine ? data.websiteLine.toString() : "",
            imageWebsite: data.imageWebsite ? data.imageWebsite.toString() : "",
            imageLogoWebsite: data.imageLogoWebsite ? data.imageLogoWebsite.toString() : "",
            clearWithdrawMin: data.clearWithdrawMin ? data.clearWithdrawMin.toString() : "",
            turnWithdrawNormal: data.turnWithdrawNormal ? data.turnWithdrawNormal.toString() : "",
            passwordCustomer: data.password ? data.password.toString() : "",
            registerStatus: data.registerStatus ? data.registerStatus.toString() : "false",
            showUsername: data.showUsername ? data.showUsername.toString() : "false",
            getName: data.getNameMember ? data.getNameMember.toString() : "false",
            checkDuplicateName: data.checkName ? data.checkName.toString() : "false",
            registerTruewallet: data.regisTrue ? data.regisTrue.toString() : "false",
        };
    }else if(page == '2'){
        setting = "deposit-withdraw";

        let detailDeposit = '';
        if(Constants.optionsFee[data.typeDepositFee-1].label == "ปกติ"){
            detailDeposit = data.depostDetailNormal
        }else if(Constants.optionsFee[data.typeDepositFee-1].label == "กำหนดเอง"){
            detailDeposit = data.depostDetailScal
        }

        let detailWithdraw = '';
        if(Constants.optionsFee[data.typeDepositFee-1].label == "ปกติ"){
            detailWithdraw = data.WithdrawDetailNormal
        }else if(Constants.optionsFee[data.typeDepositFee-1].label == "กำหนดเอง"){
            detailWithdraw = data.WithdrawDetailScal
        }

        body = {
            depositStatus: data.depositStatus ? data.depositStatus.toString() : "",
            memberCreateDeposit: data.memberCreateDeposit ? data.memberCreateDeposit.toString() : "",
            depositMin: data.depositMin ? data.depositMin.toString() : "",
            depositMax: data.depositMax ? data.depositMax.toString() : "",
            depositFee: data.depositFee ? data.depositFee.toString() : "",
            typeDepositFee: data.typeDepositFee ? data.typeDepositFee.toString() : "",
            typeDepositFeeAmountOrPerCent: data.typeDepositFeeAmountOrPerCent ? data.typeDepositFeeAmountOrPerCent.toString() : "",
            depostDetail: JSON.stringify(detailDeposit) ? JSON.stringify(detailDeposit).toString() : "",
            withdrawStatus: data.statusWithdraw ? data.statusWithdraw.toString() : "",
            withdrawAll: data.withdrawAll ? data.withdrawAll.toString() : "",
            withdrawMin: data.withdrawMin ? data.withdrawMin.toString() : "",
            withdrawMax: data.withdrawMax ? data.withdrawMax.toString() : "",
            withdrawMaxDay: data.withdrawMaxDay ? data.withdrawMaxDay.toString() : "",
            withdrawAround: data.withdrawAround ? data.withdrawAround.toString() : "",
            withdrawFee: data.withdrawFee ? data.withdrawFee.toString() : "",
            typeWithdrawFee: data.typeWithdrawFee ? data.typeWithdrawFee.toString() : "",
            typeWithdrawFeeAmountOrPerCent: data.typeWithdrawFeeAmountOrPerCent ? data.typeWithdrawFeeAmountOrPerCent.toString() : "",
            withdrawDetail:JSON.stringify(detailWithdraw) ? JSON.stringify(detailWithdraw).toString() : "",
            withdrawAuto: data.withdrawAuto ? data.withdrawAuto.toString() : "",
            tranferAuto: data.tranferAuto ? data.tranferAuto.toString() : "",
        };
    }else if(page == '3'){
        setting = "automatic";
        body = {
            refundLost: data.refundLost ? data.refundLost.toString() : "",
            typeRefundLost: data.typeRefundLost ? data.typeRefundLost.toString() : "",
            refundLostPercent: data.refundLostPercent ? data.refundLostPercent.toString() : "",
            typeRefundLostSet: data.typeRefundLostSet ? data.typeRefundLostSet.toString() : "",
            refundLostTurn: data.refundLostTurn ? data.refundLostTurn.toString() : "",
            refundLostMin: data.refundLostMin ? data.refundLostMin.toString() : "",
            refundLostMax: data.refundLostMax ? data.refundLostMax.toString() : "",
            typeRefundLostdate: data.typeRefundLostdate ? data.typeRefundLostdate.toString() : "",
            refundLostdate: data.optionRefundLostDate ? data.optionRefundLostDate.toString() : "",
            affiliate: data.affiliate ? data.affiliate.toString() : "",
            typeAffiliate: data.typeAffiliate ? data.typeAffiliate.toString() : "",
            affiliatePercent: data.affiliatePercent ? data.affiliatePercent.toString() : "",
            affiliateTurn: data.affiliateTurn ? data.affiliateTurn.toString() : "",
            affiliateMin: data.affiliateMin ? data.affiliateMin.toString() : "",
            affiliateMax: data.affiliateMax ? data.affiliateMax.toString() : "",
            typeAffiliateDate: data.typeAffiliateDate ? data.typeAffiliateDate.toString() : "",
            affiliateDate: data.affiliateDate ? data.affiliateDate.toString() : "",
        };
    }else if(page == '4'){
        setting = "notify";
        body = {
            notifyLineStatus: data.notifyLineStatus ? data.notifyLineStatus.toString() : "",
            notifyLineSummary: data.notifyLineSummary ? data.notifyLineSummary.toString() : "",
            notifyLineRegismember: data.notifyLineRegismember ? data.notifyLineRegismember.toString() : "",
            notifyLineDeposit: data.notifyLineDeposit ? data.notifyLineDeposit.toString() : "",
            notifyLineDepositList: data.notifyLineDepositList ? data.notifyLineDepositList.toString() : "",
            notifyLineWithdraw: data.notifyLineWithdraw ? data.notifyLineWithdraw.toString() : "",
            notifyLineWithdrawList: data.notifyLineWithdrawList ? data.notifyLineWithdrawList.toString() : "",
            notifySoundDepositStatus: data.notifySoundDepositStatus ? data.notifySoundDepositStatus.toString() : "",
            notifySoundDeposit: data.notifySoundDeposit ? data.notifySoundDeposit.toString() : "",
            notifySoundWithdrawStatus: data.notifySoundWithdrawStatus ? data.notifySoundWithdrawStatus.toString() : "",
            notifySoundWithdraw: data.notifySoundWithdraw ? data.notifySoundWithdraw.toString() : "",
        };
    }

    try {
        const response = await axios.post<getResponse>(`${url}/setting/updated/${setting}`,body, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}