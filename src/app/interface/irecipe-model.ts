export interface IRecipeModel {
    name?:string
    ingredients?:Array<string>
    instructions?:Array<string>
    prepTimeMinutes?:Number
    cookTimeMinutes?:Number
    servings?:Number
    difficulty?:string
    cuisine?:string
    caloriesPerServing?:Number
    image?:string
    mealType?:Array<string>
}
