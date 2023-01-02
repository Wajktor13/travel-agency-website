import { ReviewData } from "./review-data"

export type ExcursionData = {
    id: number
    name: string,
    country: string,
    startDate: string,
    endDate: string,
    unitPrice: number,
    inStock: number,
    shortDescription: string,
    longDescription: string,
    img: string,
    reviews: ReviewData[]
}