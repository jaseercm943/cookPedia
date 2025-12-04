import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn:boolean = false
  username:string = ""

  constructor(private router:Router){

  }

  ngOnInit(){
    if(sessionStorage.getItem("token") && sessionStorage.getItem("user")){
      this.isLoggedIn = true
      this.username = JSON.parse(sessionStorage.getItem("user") || "{}").name
    }
    else{
      this.isLoggedIn = false
      this.username = ""
    }
  }

  logout(){
    this.username = ""
    sessionStorage.clear()
    this.isLoggedIn = false

    this.router.navigateByUrl('/')
  }
}
