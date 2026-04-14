import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { getproductdetailresponse, GetProductsResponse, getProductsResponse, Product } from "../Modals/Product.modal";
import { Injectable } from "@angular/core";

@Injectable({
providedIn:"root"
})

export class Productservice{
constructor(private http: HttpClient) {}
public readonly BASE_URL = '/api';

private readonly PRODUCT_URL = '/api/product';

getproducts(): Observable<GetProductsResponse>{
return this.http.get<GetProductsResponse>(`${this.PRODUCT_URL}/getallproducts`)
}

searchProducts(keyword: string, minPrice:number, maxPrice: number): Observable<GetProductsResponse> {
  return this.http.get<GetProductsResponse>(`${this.PRODUCT_URL}/search`, {
    params: { keyword, minPrice, maxPrice}
  });
}

getProductById(productid: number): Observable<getproductdetailresponse>{
return this.http.get<getproductdetailresponse>(`${this.PRODUCT_URL}/getbyid/${productid}`);
}
}