import { Component, Input } from '@angular/core';
import { getproductdetailresponse, productData } from '../../Modals/Product.modal';
import { Productservice } from '../product.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../Cart/cart.service';
import { AuthService } from '../../Auth/auth.service';

@Component({
  selector: 'app-productdetails',
  imports: [],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css'
})
export class ProductdetailsComponent {
Product!: getproductdetailresponse;
destroy$ = new Subject<void>()
errormessage = "";
quantity = 1;

constructor(public productservice: Productservice, private cartservice: CartService, private authservice: AuthService, private router: Router,private routes: ActivatedRoute) {}

ngOnInit(){
const id = Number(this.routes.snapshot.paramMap.get('id'));
this.getproductbyid(id)
}

getproductbyid(id: number){
console.log(id);
this.productservice.getProductById(id).pipe(takeUntil(this.destroy$)).subscribe({
  next: (data) => {
    this.Product = data;
  },
  error: (err) => {
    this.errormessage = err.error.message;
  }
})
}

addcart(id: number, quantity : number){
if(this.authservice.currentUser.value){
this.cartservice.addtoCart(id, quantity).pipe(takeUntil(this.destroy$)).subscribe({
next: (data) => {
  console.log("Added to cart");
  alert("Added to cart sucessfully");
},
error: (err) => {
this.errormessage = err.error.message || "Unable to Add to Cart";
alert(this.errormessage);
}  
})
}
else{
  this.router.navigate(['/auth/login'])
}
}


increment(){
this.quantity = this.quantity + 1;
}

decrement(){
if (this.quantity > 1){
this.quantity = this.quantity - 1;
}
}


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
