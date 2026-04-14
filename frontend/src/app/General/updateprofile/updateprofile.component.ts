import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../Auth/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updateprofile',
  imports: [CommonModule, FormsModule],
  templateUrl: './updateprofile.component.html',
  styleUrl: './updateprofile.component.css'
})
export class UpdateprofileComponent {
UpdatedData = {
name:"",
address:"",
contactno:"",
}
destroy$ = new Subject<void>();
errormessage = "";
constructor(private authservice: AuthService, private router: Router) {}

ngOnInit(){
this.getprofile();
}

getprofile(){
this.authservice.getprofile().pipe(takeUntil(this.destroy$)).subscribe({
  next: (data) => {
    this.UpdatedData.name = data.name;
    this.UpdatedData.address = data.address;
    this.UpdatedData.contactno = data.contactno;
  },
  error: (err) => {
    this.errormessage = err.error.message || "Unable to get profile"
  }
})
}

onUpdate(form:NgForm){
  if (!form.valid) return;
  
  this.authservice.updateProfile(this.UpdatedData).pipe(takeUntil(this.destroy$)).subscribe({
    next: (data) => {
      console.log("Data Updated")
      alert("Updated sucessfully");
      this.router.navigate(['/general/profile'])

    },
    error: (err) => {
      this.errormessage = err.error.message || "Invalid fields";
      alert(this.errormessage);
    }
  })
}
}
