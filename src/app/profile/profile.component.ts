import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  uploadUserProfileImage: string = 'profile-user.jpg'
  userDownloadList:any=[]

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getUserDownloads()
    let user = JSON.parse(sessionStorage.getItem("user") || "")
    if(user.profile){
      this.uploadUserProfileImage = user.profile
    }
  }

  getUserDownloads(){
    this.api.getDownloadRecipeAPI().subscribe((res:any) => {
      this.userDownloadList = res
      console.log(this.userDownloadList);
      
    })
  }

  getFile(event:any){
    let uploadFile = event.target.files[0]

    // convert file to url
    let fr = new FileReader()
    fr.readAsDataURL(uploadFile)
    fr.onload = (event:any) => {
      this.uploadUserProfileImage = event.target.result
      console.log(this.uploadUserProfileImage);
      
    }
  }

  uploadProfile(){
    this.api.editUserAPI({profile: this.uploadUserProfileImage}).subscribe((res: any) => {
      sessionStorage.setItem('user', JSON.stringify(res))
      this.uploadUserProfileImage = res.profile
      alert("profile updated successfully")
    })
  }
}
