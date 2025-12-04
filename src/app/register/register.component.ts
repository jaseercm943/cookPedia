import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FooterComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup

  constructor(private fb: FormBuilder, private api:ApiService, private router:Router, private toast:ToastrService){
    this.registerForm = this.fb.group({
      name: ["", [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
    })
  }

  register(){
    if(this.registerForm.valid){
      const name = this.registerForm.value.name
      const email = this.registerForm.value.email
      const password = this.registerForm.value.password

      // api call
      this.api.registerAPI({name, email, password}).subscribe({
        next:((res:any) => {
          console.log(res)
          this.toast.success(`Welcom ${res.name}, Please login to explore our recipes`, 'Success')
          this.router.navigateByUrl('/login')
          this.registerForm.reset()
        }),
        error: (err => {
          console.log(err)
          alert(err.error)
          this.registerForm.reset()
        })
      })
    }
    else{
      alert("invalid form")
    }
  }
}
