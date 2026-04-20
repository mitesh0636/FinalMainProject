import { Component, Input, Output } from '@angular/core';
import { CartItems } from '../../Modals/cart.modal';
import { CartService } from '../cart.service';
import { Subject, takeUntil } from 'rxjs';
import { Productservice } from '../../General/product.service';

@Component({
  selector: 'app-cartcard',
  imports: [],
  templateUrl: './cartcard.component.html',
  styleUrl: './cartcard.component.css'
})
export class CartcardComponent {

constructor(private cartservice: CartService, public productservice: Productservice) {}
@Input() cartitem!: CartItems;
destroy$ = new Subject<void>()
errormessage = "";
localquantity: number = 0;


ngOnInit(){
this.localquantity = this.cartitem.quantity;
}

removeItem(id:number){
this.cartservice.removeItem(id).pipe(takeUntil(this.destroy$)).subscribe({
  next : (data) => {
    console.log("Item removed");
    alert("Removed Sucessfully");
  },
  error: (err) => {
  this.errormessage = err.error?.message
  }
})
}

updatequantity(id:number, quantity:number)
{
console.log(quantity);
this.cartservice.updateQuantity(id, quantity).pipe(takeUntil(this.destroy$)).subscribe({
  next: (data) => {
    alert("Quantity updated sucessfully");
    console.log("Quantity Updated")
  },
  error: (err) => {
    this.errormessage = err.error.message;
    alert(this.errormessage);
  }
})
}

increment(){
this.localquantity = this.localquantity + 1;
}

decrement(){
if (this.localquantity > 1){
this.localquantity = this.localquantity - 1;
}
}
}
