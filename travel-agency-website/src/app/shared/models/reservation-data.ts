import { ExcursionData } from "./excursion-data"

export type ReservationData = {
    excursionData: ExcursionData
    reservationDate: string
    status: string
    amount: number  
}