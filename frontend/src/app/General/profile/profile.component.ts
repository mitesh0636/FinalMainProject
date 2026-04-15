import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { profileData, UserData } from '../../Modals/Register.modal';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../Auth/auth.service';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
UserDetail!: profileData;
errormessage = "";
private destroy$ = new Subject<void>()

constructor(private authservice: AuthService, private router: Router) {}

ngOnInit()
{
this.getprofile();
}


getprofile(){
this.authservice.getprofile().pipe(takeUntil(this.destroy$)).subscribe({
  next: (data) => {
    this.UserDetail = data;
  },
  error: (err) => {
    this.errormessage = err.error.message || "Unable to get profile"
  }
})
}

goupdate(){
this.router.navigate([`general/update/${this.UserDetail.id}`])
}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

