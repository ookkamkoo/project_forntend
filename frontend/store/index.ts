import { defineStore } from 'pinia';
import type { Notify,Setting } from './typeNotift';

export const notifyStore = defineStore('setting', {
    state: () => ({
        notify: {
            withdraw: "0",
            deposit: "0",
        } as Notify,
        setting: {
            bgColor: "",
            bgImage: "",
            bgImageSw: "",
            checkDuplicateName: "",
            clearWithdrawMin: "",
            depositFee: "",
            depositMax: "",
            depositMin: "",
            depositStatus: "",
            depostDetail: "",
            description: "",
            getName: "",
            imageLogoWebsite: "",
            imageWebsite: "",
            keyword: "",
            memberCreateDeposit: "",
            notifyLineDeposit: "",
            notifyLineDepositList: "",
            notifyLineRegismember: "",
            notifyLineStatus: "",
            notifyLineSummary: "",
            notifyLineWithdraw: "",
            notifyLineWithdrawList: "",
            notifySoundDeposit: "",
            notifySoundDepositStatus: "",
            notifySoundWithdraw: "",
            notifySoundWithdrawStatus: "",
            passwordCustomer: "",
            product: "",
            recommend: "",
            recommendDate: "",
            recommendMax: "",
            recommendMin: "",
            recommendPercent: "",
            recommendTurn: "",
            refundLost: "",
            refundLostMax: "",
            refundLostMin: "",
            refundLostPercent: "",
            refundLostTurn: "",
            refundLostdate: "",
            registerStatus: "",
            registerTruewallet: "",
            showUsername: "",
            serverStatus: "true", // ค่าเริ่มต้นให้ serverStatus เป็น "false"
            title: "",
            tranferAuto: "",
            turnWithdrawNormal: "",
            type2factor: "",
            typeDepositFee: "",
            typeDepositFeeAmountOrPerCent: "",
            typeRecommend: "",
            typeRecommendDate: "",
            typeRefundLost: "",
            typeRefundLostSet: "",
            typeRefundLostdate: "",
            typeWithdrawFee: "",
            typeWithdrawFeeAmountOrPerCent: "",
            websiteLine: "",
            websiteUrl: "",
            withdrawAll: "",
            withdrawAround: "",
            withdrawAuto: "",
            withdrawDetail: "",
            withdrawFee: "",
            withdrawMax: "",
            withdrawMaxDay: "",
            withdrawMin: "",
            withdrawStatus: "",
        } as Setting,
        memberOnline: 0,
    }),
    actions: {
        setNotify(data: Notify) {
            this.notify = data;
            console.log("Notify details updated:", data);
        },
        setSetting(data: Setting) {
            this.setting = data;
            console.log("Setting details updated:", data);
        },
        setMemberOnline(data: number) {
            this.memberOnline = data;
            console.log("MemberOnline details updated:", data);
        },
    },
});