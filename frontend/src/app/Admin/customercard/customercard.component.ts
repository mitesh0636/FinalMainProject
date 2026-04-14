import { Component, Input } from '@angular/core';
import { allcust } from '../../Modals/customer.modal';
import { Adminservice } from '../admin.service';
import { Subject, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customercard',
  imports: [DatePipe],
  templateUrl: './customercard.component.html',
  styleUrl: './customercard.component.css'
})
export class CustomercardComponent {
@Input() Customer!:allcust;
destroy$ = new Subject<void>();
errormessage = "";

constructor(private adminservice: Adminservice) {}


toggleLock(id:number){
this.adminservice.toggleLock(id).pipe(takeUntil(this.destroy$)).subscribe({
next: (data) => {
  console.log("Toggled Sucessfully");
},
error: (err) => {
this.errormessage = err.error.message; 
}
})

}
}
