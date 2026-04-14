import { Component } from '@angular/core';
import { getcustomerordersresponse} from '../../Modals/order.modal';
import { OrdercardComponent } from '../ordercard/ordercard.component';
import { Orderservice } from '../order.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordermain',
  imports: [OrdercardComponent],
  templateUrl: './ordermain.component.html',
  styleUrl: './ordermain.component.css'
})
export class OrdermainComponent {
orders: getcustomerordersresponse[]= [];
errormessage = "";
destroy$ = new Subject<void>();

constructor(private orderservice: Orderservice, private router: Router) {}


ngOnInit(){
  this.getorders();
}

getorders(){
this.orderservice.getcustomerorders().pipe(takeUntil(this.destroy$)).subscribe({
  next: (data) => {
    this.orders = data;
  },
  error: (err) => {
    this.errormessage = err.error?.message || 'Unable to fetch orders'
  }
})
}


handleopendetails(orderId: number){
  console.log(orderId);
  this.router.navigate(['order/orderdetails', orderId])
}
}
