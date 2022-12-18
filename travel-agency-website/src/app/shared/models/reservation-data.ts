import { ExcursionData } from "./excursions-data"

export type ReservationData = {
    excursionData: ExcursionData
    reservationDate: string
    status: string
    reservations: number  
}