import { UserRoles } from "./user-roles";

export type UserData = {
    uid: string;
    email: string;
    nickname: string;
    roles: UserRoles
 }