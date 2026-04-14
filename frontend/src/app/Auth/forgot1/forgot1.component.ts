import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subject, takeLast, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot1',
  imports: [FormsModule],
  templateUrl: './forgot1.component.html',
  styleUrl: './forgot1.component.css'
})
export class Forgot1Component {
destroy$ = new Subject<void>();
errormessage = "";


constructor(public authservice: AuthService, private router: Router) {}

generate(){
this.authservice.requestOTP(this.authservice.email).pipe(takeUntil(this.destroy$)).subscribe({
  next: (data) => {
    this.authservice.otp = data;
    this.router.navigate(['/auth/forgot2'])
  },
  error:(err) => {
    this.errormessage = err.error.message;
  }
});
}
}
