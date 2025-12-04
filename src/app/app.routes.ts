import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecipiesComponent } from './recipies/recipies.component';
import { ProfileComponent } from './profile/profile.component';
import { SavedRecipiesComponent } from './saved-recipies/saved-recipies.component';
import { ViewRecipieComponent } from './view-recipie/view-recipie.component';
import { authGuard } from './guards/auth.guard';
import { userauthGuard } from './guards/userauth.guard';

export const routes: Routes = [
    {
        path: "admin", canActivate:[authGuard], loadChildren:()=>import('./admin/admin.module').then(m => m.AdminModule)
    },
    {path:"", component:HomeComponent, title:'Home'},
    {path:"about", component:AboutComponent, title:'About'},
    {path:"contact", component:ContactComponent, title:'Contact'},
    {path:"login", component:LoginComponent, title:'Login'},
    {path:"register", component:RegisterComponent, title:'Register'},
    {path:"recipies",canActivate:[userauthGuard], component:RecipiesComponent, title:'Recipies'},
    {path:"profile",canActivate:[userauthGuard], component:ProfileComponent, title:'Profile'},
    {path:"saved-collection",canActivate:[userauthGuard], component:SavedRecipiesComponent, title:'Recipe Collection'},
    {path:"view/recipe/:id",canActivate:[userauthGuard], component:ViewRecipieComponent, title:'Recipe Details'},
];
