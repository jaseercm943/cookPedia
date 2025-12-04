import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SearchPipe } from '../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-recipies',
  standalone: true,
  imports: [RouterLink, HeaderComponent, FooterComponent, SearchPipe, FormsModule, NgxPaginationModule],
  templateUrl: './recipies.component.html',
  styleUrl: './recipies.component.css'
})
export class RecipiesComponent {

  allRecipe: any = []
  dummyAllRecipe: any = []
  cuisineArray: string[] = []
  mealArray: string[] = []
  searchKey: string = ""

  p: number = 1;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getAllRecipe()
  }

  getAllRecipe() {
    this.api.getAllRecipeAPI().subscribe((res: any) => {
      this.allRecipe = res
      this.dummyAllRecipe = res
      console.log(this.allRecipe);

      this.allRecipe.forEach((res: any) => {
        !this.cuisineArray.includes(res.cuisine) && this.cuisineArray.push(res.cuisine)
        console.log(this.cuisineArray);

      });

      this.allRecipe.forEach((rec: any) => {
        rec.mealType.forEach((meal: string) => {
          !this.mealArray.includes(meal) && this.mealArray.push(meal)
          console.log(this.mealArray);
        })
      });

    })
  }

  filterRecipe(key: any, value: string) {
    this.allRecipe = this.dummyAllRecipe.filter((res: any) => res[key].includes(value))
  }

  viewRecipe(id: string) {
    console.log(id)
    if (sessionStorage.getItem('token')) {
      this.router.navigateByUrl(`/view/recipe/${id}`)
    } else {
      alert("Please login to get full access")
    }

  }
}
