import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { IRecipeModel } from '../../interface/irecipe-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-recipe',
  templateUrl: './manage-recipe.component.html',
  styleUrl: './manage-recipe.component.css'
})
export class ManageRecipeComponent {

  @Input() id: string = ""
  recipeDetails: IRecipeModel = {};

  cuisineArray: any = [];
  mealArray: any = [];

  ingredientsArray: any = [];
  instructionsArray: any = [];
  mealTypeArray: any = [];

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getAllRecipes();
    // console.log(this.recipeDetails)
  }

  getAllRecipes = () => {
    this.api.getAllRecipeAPI().subscribe((res: any) => {
      console.log(res);
      if (this.id) {
        this.recipeDetails = res.find((item: any) => item._id == this.id)
        this.ingredientsArray = this.recipeDetails.ingredients
        this.instructionsArray = this.recipeDetails.instructions
        this.mealTypeArray = this.recipeDetails.mealType
        console.log(this.recipeDetails);

      }
      res.forEach((item: any) => {
        !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine)
      });
      // console.log('cuisinearray', this.cuisineArray);

      res.forEach((item: any) =>
        item.mealType.forEach((meal: any) => !this.mealArray.includes(meal) && this.mealArray.push(meal)
        )
      );

      // console.log(this.cuisineArray,this.mealArray)
    });
  };

  addIngredient = (input: any) => {
    if (input.value) {
      this.ingredientsArray.push(input.value);
      input.value = '';
    }
  };

  addInstruction = (instruInput: any) => {
    if (instruInput.value) {
      this.instructionsArray.push(instruInput.value);
      instruInput.value = '';
    }
  };

  deleteInstruction(index: number) {
    // console.log(index)
    this.instructionsArray = this.instructionsArray.filter((item: any, i: any) => i != index);
  }

  deleteIgredient(index: number) {
    this.ingredientsArray = this.ingredientsArray.filter((item: any, i: any) => i != index);
  }

  addMealType = (event: any) => {
    if (event.target.checked) {
      !this.mealTypeArray.includes(event.target.name) && this.mealTypeArray.push(event.target.name);
    } else {
      this.mealTypeArray = this.mealTypeArray.filter((item: any) => item != event.target.name);
    }
    console.log(this.mealTypeArray)
  };

  addRecipe() {
    this.recipeDetails.ingredients = this.ingredientsArray;
    this.recipeDetails.instructions = this.instructionsArray;
    this.recipeDetails.mealType = this.mealTypeArray;

    const {
      name,
      ingredients,
      instructions,
      prepTimeMinutes,
      cookTimeMinutes,
      servings,
      difficulty,
      cuisine,
      caloriesPerServing,
      image,
      mealType,
    } = this.recipeDetails;

    console.log(this.recipeDetails);

    if (
      name &&
      ingredients!.length > 0 &&
      instructions!.length > 0 &&
      prepTimeMinutes &&
      cookTimeMinutes &&
      servings &&
      difficulty &&
      cuisine &&
      caloriesPerServing &&
      image &&
      mealType!.length > 0
    ) {

      this.api.addRecipeAPI(this.recipeDetails).subscribe({
        next: (res: any) => {
          alert("recipe added to your collection")
          this.recipeDetails = {}
          this.ingredientsArray = []
          this.instructionsArray = []
          this.mealTypeArray = []
          this.router.navigateByUrl('/admin/recipe-list')
        },
        error: (rsn: any) => {
          alert(rsn.error)
        }
      })
    } else {

      alert("Enter all fields")

    }
  }

  removeMealType(meal: any) {
    this.mealTypeArray = this.mealTypeArray.filter((item: any) => item != meal)
  }

  editRecipe() {
    this.recipeDetails.ingredients = this.ingredientsArray;
    this.recipeDetails.instructions = this.instructionsArray;
    this.recipeDetails.mealType = this.mealTypeArray;

    const {
      name,
      ingredients,
      instructions,
      prepTimeMinutes,
      cookTimeMinutes,
      servings,
      difficulty,
      cuisine,
      caloriesPerServing,
      image,
      mealType,
    } = this.recipeDetails;

    console.log(this.recipeDetails);

    if (
      name &&
      ingredients!.length > 0 &&
      instructions!.length > 0 &&
      prepTimeMinutes &&
      cookTimeMinutes &&
      servings &&
      difficulty &&
      cuisine &&
      caloriesPerServing &&
      image &&
      mealType!.length > 0
    ) {

      this.api.updateRecipeAPI(this.id, this.recipeDetails).subscribe((res: any) => {

        alert("recipe updated successfully")
        this.recipeDetails = {}
        this.ingredientsArray = []
        this.instructionsArray = []
        this.mealTypeArray = []
        this.router.navigateByUrl('/admin/recipe-list')
      })
    } else {

      alert("Enter all fields")

    }
  }
}