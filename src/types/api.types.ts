export interface Speise {
    id: number,
    recipes: number[],
    title: string
}

export interface Recipe {
    description: string,
    id: number,
    ingredients: number[],
    title: string
}

export interface Ingredient {
    id: number,
    package_amount: number,
    price: number,
    title: string
}