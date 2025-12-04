import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  recipeList: any = []
  searchRecipe: string = ""

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getRecipes()
  }
  getRecipes = () => {
    this.api.getAllRecipeAPI().subscribe((res: any) => {
      console.log(res)
      this.recipeList = res
    })
  }

  handleManageRecipe = () => {
    this.router.navigateByUrl("/admin/recipe/add")
  }

  handleRemoveRecipe(id:string) {
    this.api.deleteRecipeAPI(id).subscribe((res:any) => {
      this.getRecipes()
    })
  }
}
