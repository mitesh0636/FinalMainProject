import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { productData } from "../Modals/Product.modal";
import { allcust } from "../Modals/customer.modal";
import { Inject, Injectable } from "@angular/core";


@Injectable({
providedIn: "root"
})
export class Adminservice{
constructor(private http: HttpClient) {}

private readonly ADMIN_URL = '/api/admin';

getAllCustomers(): Observable<allcust[]>{
    return this.http.get<allcust[]>(`${this.ADMIN_URL}/getAllCustomers`);
}

toggleLock(userId: number): Observable<any>{
    return this.http.delete(`${this.ADMIN_URL}/togglelock/${userId}`)
}

createproducttype(typename: string): Observable<any>{
    return this.http.post(`${this.ADMIN_URL}/createproducttype`, {typename});
}

checkprodid(id: number): Observable<any>{
    return this.http.get(`${this.ADMIN_URL}/checkprodid/${id}`);
}

checkcatid(id: number): Observable<any>{
    return this.http.get(`${this.ADMIN_URL}/checkcatid/${id}`);
}
createcategory(producttypeid: number, categoryname: string): Observable<any>{
    return this.http.post(`${this.ADMIN_URL}/createcategory/${producttypeid}`,{categoryname});
}

createsubcategory(categoryid: number, subcategoryname: string): Observable<any>{
    return this.http.post(`${this.ADMIN_URL}/createsubcategory/${categoryid}`, {subcategoryname});
}

createProduct(ProdData: FormData): Observable<any>{
    return this.http.post(`${this.ADMIN_URL}/createProduct`, ProdData);
}

updateProduct(productid: number, UpdateData: FormData): Observable<any>{
    return this.http.post(`${this.ADMIN_URL}/updateproduct/${productid}`,UpdateData)
}

deleteProduct(productid: number): Observable<any>{
    return this.http.delete(`${this.ADMIN_URL}/deleteProduct/${productid}`)
}

getallorders(): Observable<any>{
    return this.http.get(`${this.ADMIN_URL}/getallorders`);
}





}