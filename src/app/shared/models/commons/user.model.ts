export interface UserModel {
    phone: string;
    captcha: string;
    username: string,
    oldPassword: string,
    newPassword: string,
    email: string;
    fullname: string;
    roleName: string;
    groupName: string;
    createdDate: string;
    userId?: string | number;
    sessionId?:string;
}
export const ROLE = {
    ADMIN: 'ADMIN',
    BO_CSKH: "BO",
    FO_CSKH: "FO_CSKH",
    DIEM_BAN: "DIEM_BAN",
    USER: "USER"
}
