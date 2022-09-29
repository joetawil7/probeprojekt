import { Ingredient } from "./api.types"

export interface MenuItem {
    title: string,
    description: string,
    price: number,
    ingredients: Ingredient[],
    count?: number
}