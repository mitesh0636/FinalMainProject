import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getcustomerordersresponse} from '../../Modals/order.modal';
import { Orderservice } from '../order.service';
import { Subject, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ordercard',
  imports: [DatePipe],
  templateUrl: './ordercard.component.html',
  styleUrl: './ordercard.component.css'
})
export class OrdercardComponent {

constructor(private orderservice: Orderservice) {}
@Input() order!: getcustomerordersresponse


@Output() sendid = new EventEmitter<number>();
destroy$ = new Subject<void>()
errormessage = "";


ViewOrder(): void {
  if (this.order && this.order.id){
    this.sendid.emit(this.order.id);
  }
}


CancelOrder(id:number){
  this.orderservice.cancelOrder(id).pipe(takeUntil(this.destroy$)).subscribe({
    next: (data) => {
      alert("Order Cancelled");
      console.log("Order Cancelled");
    },
    error: (err) => {
      this.errormessage = err.error?.message || "Unable to cancel order"
      alert(this.errormessage);
    }
    })
  }
} 



