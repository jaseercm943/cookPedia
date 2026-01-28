import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink,Router } from "@angular/router";
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'

@Component({
  selector: 'app-view-recipie',
  standalone: true,
  imports: [RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './view-recipie.component.html',
  styleUrl: './view-recipie.component.css'
})
export class ViewRecipieComponent {
  imagePreparationTime: String = 'time.png'
  imageCookingTime: String = 'cook-time.png'
  imageKcal: String = 'kcal-image.png'

  recipeId: string = ""
  recipeDetails: any
  allRelatedRecipes: any = []

  constructor(private ar: ActivatedRoute, private api: ApiService,private router:Router) { }

  ngOnInit() {
    // path parameter
    this.ar.params.subscribe((res: any) => {
      this.recipeId = res.id
      console.log(this.recipeId);
      this.RecipeDetails(this.recipeId)

    })
  }

  RecipeDetails(id: string) {
    this.api.singleRecipeAPI(id).subscribe((res: any) => {
      this.recipeDetails = res
      console.log("recipe details", this.recipeDetails);

      this.getAllRelatedRecipes(res.cuisine)
    })
  }

  getAllRelatedRecipes(cuisine: string) {
    this.api.relatedRecipeAPI(cuisine).subscribe((res: any) => {
      if (res.length > 1) {
        this.allRelatedRecipes = res.filter((item: any) => item.name != this.recipeDetails.name)
        console.log(this.allRelatedRecipes);
      }
      else {
        this.allRelatedRecipes = []
      }
    })
  }

  saveRecipe() {
    this.api.saveRecipeAPI(this.recipeId, this.recipeDetails).subscribe({
      next: (res: any) => {
        console.log(this.recipeId);
        alert("Recipe added to your collection")
      },
      error: (reason: any) => {
        alert(reason.error)
      }
    })
  }

  generatePDF() {
    const pdf = new jsPDF()
    pdf.setFontSize(16)
    pdf.setTextColor('red')
    pdf.text(this.recipeDetails.name, 10, 10)

    pdf.setFontSize(12)
    pdf.setTextColor('black')
    pdf.text(`Cuisine: ${this.recipeDetails.cuisine}`, 10, 20)
    pdf.text(`Servings: ${this.recipeDetails.servings}`, 10, 25)
    pdf.text(`Mode of Cooking: ${this.recipeDetails.difficulty}`, 10, 30)
    pdf.text(`Total Preperation Time: ${this.recipeDetails.prepTimeMinutes} Minutes`, 10, 35)
    pdf.text(`Total Cooking Time: ${this.recipeDetails.cookTimeMinutes} Minutes`, 10, 40)
    pdf.text(`Total Calories Per Servings: ${this.recipeDetails.caloriesPerServings} Minutes`, 10, 45)

    let head = [['Ingredients Needed', 'Cooking Instruction']]
    let body = []

    body.push([this.recipeDetails.ingredients, this.recipeDetails.instructions])
    autoTable(pdf, { head, body, startY: 50 })

    pdf.output('dataurlnewwindow')
    pdf.save('download-recipe.pdf')
  }

  downloadRecipe() {
    this.api.downloadRecipeAPI(this.recipeId, this.recipeDetails).subscribe((res: any) => {
      this.api.getChartData()
      this.generatePDF()
    })
  }
   viewRecipe(id: string,cuisine:string) {
    console.log(id)
    if (sessionStorage.getItem('token')) {
      this.router.navigateByUrl(`/view/recipe/${id}`)
      this.getAllRelatedRecipes(cuisine)
    } else {
      alert("Please login to get full access")
    }

  }
}



