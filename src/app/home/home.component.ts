import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  imageUrl: string = 'image_chicken.png'
  imageUrlCard: string = 'image_dish_card_1.png'
  imageUrlHome: string = 'home_image.jpg'

  // api call
  allRecipes: any = []
  allTestimony: any = []
  
  constructor(private api: ApiService) {

  }

  // life cycle method
  ngOnInit() {
    this.getAllRecipe()
    this.getAllApprovedTestimony()
  }

  getAllRecipe() {
    this.api.getAllRecipeAPI().subscribe((res: any) => {
      console.log(res)
      this.allRecipes = res.slice(0, 6)
      console.log(this.allRecipes);

    })
  }

  getAllApprovedTestimony() {
    this.api.getApprovedTestimonialAPI().subscribe((res: any) => {
      this.allTestimony = res
      console.log(res);
      
    })
  }
}
