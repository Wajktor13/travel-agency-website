import { CartItem } from "./cart-item";
import { ReservationData } from "./reservation-data";
import { UserRoles } from "./user-roles";

export type UserData = {
    uid: string
    email: string
    nickname: string
    roles: UserRoles
    banned: boolean
    inCart: CartItem[]
    reservations: ReservationData[]
 }