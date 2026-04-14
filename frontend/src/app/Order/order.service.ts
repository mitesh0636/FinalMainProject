import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { combineded, combinedorder } from "../Modals/order.modal";


@Injectable({
    providedIn: "root"
})

export class Orderservice{
constructor(private http: HttpClient) {}

private readonly ORDER_URL = '/api/order'

checkout(paymentMethod: string): Observable<any>
{
return this.http.post(`${this.ORDER_URL}/checkout`, {paymentMethod});
}

getcustomerorders(): Observable<any>{
    return this.http.get(`${this.ORDER_URL}/getcustomerorders`);
}

getOrderDetails(orderId: number): Observable<combineded>{
    return this.http.get<combineded>(`${this.ORDER_URL}/getorderdetails/${orderId}`)
}

cancelOrder(orderId: number): Observable<any>{
    return this.http.delete(`${this.ORDER_URL}/cancelorder/${orderId}`)
}
}