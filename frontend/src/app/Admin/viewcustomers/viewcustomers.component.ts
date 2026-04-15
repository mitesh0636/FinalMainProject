import { Component } from '@angular/core';
import { allcust } from '../../Modals/customer.modal';
import { Adminservice } from '../admin.service';
import { Subject, takeUntil } from 'rxjs';
import { CustomercardComponent } from '../customercard/customercard.component';

@Component({
  selector: 'app-viewcustomers',
  imports: [CustomercardComponent],
  templateUrl: './viewcustomers.component.html',
  styleUrl: './viewcustomers.component.css'
})
export class ViewcustomersComponent {
Customers!: allcust[];
destroy$ = new Subject<void>();
errormessage = "";


constructor(private adminservice: Adminservice) {}

ngOnInit(){
this.getallcustomers();
}

getallcustomers()
{
  this.adminservice.getAllCustomers().pipe(takeUntil(this.destroy$)).subscribe({
    next:(data) => {
      this.Customers = data;
    },
    error: (err) => {
      this.errormessage = err.error.message;
    }
  })
}


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
