import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-saved-recipies',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './saved-recipies.component.html',
  styleUrl: './saved-recipies.component.css'
})
export class SavedRecipiesComponent {
  Recipies: any = []

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getSavedRecipies()
  }

  getSavedRecipies() {
    this.api.getUserSavedRecipeAPI().subscribe((res: any) => {
      this.Recipies = res
      console.log(this.Recipies);
      
    })
  }

  removeRecipe(id: string){
    this.api.deleteSavedRecipeAPI(id).subscribe((res: any) => {
      this.getSavedRecipies()
    })
  }
}
