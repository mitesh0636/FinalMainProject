import { Component, NgModule } from '@angular/core';
import { LoginData } from '../../Modals/Register.modal';
import { Subject, takeUntil } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginData: LoginData = {
  email:'',
  password: ''
};
errorMessage="";
private destroy$ = new Subject<void>();

constructor(private authservice: AuthService, private router: Router) {}

onLogin(form:NgForm) {
  if (form.invalid) 
    {
      console.log("invalid");
      return;
    }


  this.authservice.login(this.loginData).pipe(takeUntil(this.destroy$)).subscribe({
    next: (data) => {
      console.log(data);
      alert("LoggedIn Sucessfully");
      this.router.navigate(['/general']);
      localStorage.setItem('type', 'user');
    },
    error: (err) => {
      this.errorMessage = err.error?.message || "Invalid username or password";
      alert(this.errorMessage);
    }
  })
}

}
