import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup

  constructor(private fb: FormBuilder, private api:ApiService, private router:Router, private toast: ToastrService){
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]]
    })
  }

  login(){
    if(this.loginForm.valid){
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password

      // api call
      this.api.loginAPI({email, password}).subscribe({
        next: (res:any) => {
          this.toast.success("Welcome", 'Success')
          sessionStorage.setItem("user", JSON.stringify(res.user))
          sessionStorage.setItem("token", res.token)

          this.loginForm.reset()

          if(res.user.role == "User"){
            this.router.navigateByUrl('/')
          }
          else{
            
            // to store chart data in session storage
            this.api.getChartData()

            // re-direct to admin dashboard
            this.router.navigateByUrl('/admin')
          }
        },
        error: (err) => {

          this.loginForm.reset()
        }
      })
    }
  }
}
