import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { CartItems } from "../Modals/cart.modal";

@Injectable({
providedIn:'root'
})

export class CartService{

private cartItemsSubject = new BehaviorSubject<CartItems[]>([]);
cartItems$ = this.cartItemsSubject.asObservable();
constructor(private http: HttpClient) {}

private readonly CART_URL = '/api/cart'


addtoCart(productId: number, quantity: number): Observable<any>{
    return this.http.post(`${this.CART_URL}/addcart`,{productId, quantity} )
}

getorcreatecart(): Observable<any> {
    return this.http.get<any>(`${this.CART_URL}/createcart`).pipe(
      tap(data => this.cartItemsSubject.next(data.cartITEM))
    );
  }


  updateQuantity(itemId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.CART_URL}/update/${itemId}`, { quantity }).pipe(
      tap(() => {
        const currentItems = this.cartItemsSubject.value.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        );
        this.cartItemsSubject.next(currentItems);
      })
    );
  }


  removeItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.CART_URL}/removeItem/${itemId}`).pipe(
      tap(() => {
        const currentItems = this.cartItemsSubject.value.filter(item => item.id !== itemId);
        this.cartItemsSubject.next(currentItems);
      })
    );
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.CART_URL}/clearcart`).pipe(
      tap(() => this.cartItemsSubject.next([]))
    );
  }
}


