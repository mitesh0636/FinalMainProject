import { getProductsResponse, productData } from "./Product.modal";
import { UserData } from "./Register.modal";

export interface getcustomerordersresponse{
id:number;
TotalPayment: number;
orderDate: Date;
TaxApplied: number;
SubTotal: number;
deliveryDate: Date;
orderstatus:"ordered" | "dispatched" | "delivered" | "cancelled";
paymentMethod: "credit | debit" | "banktransfer" | "cashondelivery";
}

export interface getorderitemdetails{
id: number;
priceAtPurchase: number;
quantity: number;
product: getProductsResponse
}

export interface combinedorder{
orderdes: getcustomerordersresponse;
orderitems: getorderitemdetails[];
}


export interface combineded extends getcustomerordersresponse{
user: UserData;
orderitem: getorderitemdetails[];
}