import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserData } from '../../Modals/Register.modal';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
RegisterData =  {
name: "",
email: "",
password: "",
address: '',
dateofbirth: '',
contactno: '',
role: 'user'
}
errorMessage="";
private destroy$ = new Subject<void>();

constructor(private authservice: AuthService, private router: Router) {}

authservice = inject(AuthService);
onRegister(form: NgForm) {
    if (form.invalid) return;

    const finalData: UserData = {
      ...this.RegisterData,
      dateofbirth: new Date(this.RegisterData.dateofbirth) 
    };

    this.authservice.register(finalData).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        alert("Registered Sucessfully");
        this.router.navigate(['auth/login']);
        console.log("Registered sucessfully")},
      error: (err) => {this.errorMessage = err.error.message
      alert(this.errorMessage)
      }
    });
  }
}

