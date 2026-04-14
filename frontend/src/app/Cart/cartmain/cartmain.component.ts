import { Component, OnInit } from '@angular/core';
import { CartItems } from '../../Modals/cart.modal';
import { CartcardComponent } from '../cartcard/cartcard.component';
import { AuthService } from '../../Auth/auth.service';
import { CartService } from '../cart.service';
import { Subject, take, takeUntil } from 'rxjs';
import { Orderservice } from '../../Order/order.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cartmain',
  imports: [CartcardComponent, FormsModule, CommonModule],
  templateUrl: './cartmain.component.html',
  styleUrl: './cartmain.component.css'
})
export class CartmainComponent implements OnInit{
CartItems: CartItems[] = [];
destroy$ = new Subject<void>()
errormessage = "";
Total = 0;
selectedpayment = 'debit';
payments = ['credit', 'debit', 'banktransfer', 'cashondelivery'];
constructor(private cartservice: CartService, private orderService: Orderservice) {}

ngOnInit(){
this.cartservice.cartItems$.pipe(takeUntil(this.destroy$)).subscribe(items => {
    this.CartItems = items;
    this.calculateTotal();
  });

this.getcart();  
}




getcart(){
this.cartservice.getorcreatecart().pipe(takeUntil(this.destroy$)).subscribe(
  {
    next: (data) => {
      this.CartItems = data.cartITEM;
    },
    error: (err) => {
      this.errormessage = err.error?.message || "Invalid Data";

    }
  }
)
}

clearcart()
{
this.cartservice.clearCart().pipe(takeUntil(this.destroy$)).subscribe({
next: (data) => {
  console.log("Cart Cleared Sucessfully");
  alert("Cart Cleared Sucessfully");
},
error: (err) => {
  this.errormessage = err.error.message || "Unable to clear Cart"
  alert(this.errormessage);
}
})
}


checkout(selectedpayment: string){
  console.log(selectedpayment);
this.orderService.checkout(selectedpayment).pipe(takeUntil(this.destroy$)).subscribe({
  next: (data) => {
    alert("Order Placed. Go to Orders to track status")
    console.log("Order Placed")
  },
  error: (err) => {
    this.errormessage = err.error.message || "Checkout Failed";
    alert(this.errormessage);
  }
});
}

calculateTotal() {
  this.Total = this.CartItems.reduce((acc, item) => acc + (item.productc.price * item.quantity), 0);
}

}
