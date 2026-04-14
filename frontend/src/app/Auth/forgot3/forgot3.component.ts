import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { resetPassword } from '../../Modals/Register.modal';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-forgot3',
  imports: [FormsModule],
  templateUrl: './forgot3.component.html',
  styleUrl: './forgot3.component.css'
})
export class Forgot3Component {
newPassword = "";
confirmPassword = "";
destroy$ = new Subject<void>()
errormessage = "";

constructor(public authservice: AuthService, private router: Router){} 


reset(){
this.authservice.resetPassword(this.authservice.email, this.authservice.otp, this.newPassword, this.confirmPassword).pipe(takeUntil(this.destroy$)).subscribe({
  next: (data) => {
   alert("Password updated sucessfully"); 
   this.router.navigate(['/auth/login']);
  },
  error: (err) => {
    this.errormessage = err.error.message || "Unable to reset";
  }
})
}
}
