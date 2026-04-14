import { Routes } from "@angular/router";
import { OrdermainComponent } from "./ordermain/ordermain.component";
import { OrderdetailsComponent } from "./orderdetails/orderdetails.component";

export const ORDERROUTES: Routes = [
    {path:"", component:OrdermainComponent},
    {path:"orderdetails/:id", component:OrderdetailsComponent}
]