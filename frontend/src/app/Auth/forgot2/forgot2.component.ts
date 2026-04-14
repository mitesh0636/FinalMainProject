import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from "@angular/forms";
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot2',
  imports: [FormsModule],
  templateUrl: './forgot2.component.html',
  styleUrl: './forgot2.component.css'
})
export class Forgot2Component {
enteredotp = "";
destroy$ = new Subject<void>();
errormessage = "";
constructor(public authservice: AuthService, private router: Router){
}

VerifyOTP(){
this.authservice.verifyOTP(this.authservice.email, this.enteredotp.toString()).pipe(takeUntil(this.destroy$)).subscribe({
  next: (data) => {
    alert("Verified Sucessfully")
    this.router.navigate(['/auth/forgot3'])
  },
  error: (err) => {
    this.errormessage = err.error.message || 'Unable to Verify';
  }
})

}
}
