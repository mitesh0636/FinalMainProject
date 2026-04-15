import { Component } from '@angular/core';
import { combineded } from '../../Modals/order.modal';
import { Subject, takeUntil } from 'rxjs';
import { Adminservice } from '../admin.service';
import { OrderdetailsComponent } from '../../Order/orderdetails/orderdetails.component';
import { ViewordercardComponent } from '../viewordercard/viewordercard.component';

@Component({
  selector: 'app-vieworders',
  imports: [ViewordercardComponent],
  templateUrl: './vieworders.component.html',
  styleUrl: './vieworders.component.css'
})
export class ViewordersComponent {
Orders!:combineded[];
destroy$ = new Subject<void>();
errormessage = "";

constructor(private adminservice: Adminservice) {}

ngOnInit(){
this.getordersall();
}


getordersall(){
this.adminservice.getallorders().pipe(takeUntil(this.destroy$)).subscribe({
  next: (data) => {
    this.Orders = data;
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
