import { Component } from '@angular/core';
import { combineded, combinedorder, getcustomerordersresponse, getorderitemdetails } from '../../Modals/order.modal';
import { OrderitemcardsComponent } from '../orderitemcards/orderitemcards.component';
import { Orderservice } from '../order.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orderdetails',
  imports: [OrderitemcardsComponent, DatePipe],
  templateUrl: './orderdetails.component.html',
  styleUrl: './orderdetails.component.css'
})
export class OrderdetailsComponent {
fullorder!: combineded; 
destroy$ = new Subject<void>()
errormessage = "";

constructor(private orderservice: Orderservice, private routes: ActivatedRoute) {}

ngOnInit(){
const id = Number(this.routes.snapshot.paramMap.get('id'));
this.getorderdetails(id);
}

getorderdetails(id: number){
this.orderservice.getOrderDetails(id).pipe(takeUntil(this.destroy$)).subscribe({
  next: (data) => {
    this.fullorder = data;
  },
  error: (err) => {
   this.errormessage = err.error.message;
  }
})
}
}
