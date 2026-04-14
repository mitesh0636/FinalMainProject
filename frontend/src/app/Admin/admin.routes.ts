import { Routes } from "@angular/router";
import { CreatetypeComponent } from "./createtype/createtype.component";
import { CreateproductComponent } from "./createproduct/createproduct.component";
import { UpdateproductComponent } from "./updateproduct/updateproduct.component";
import { ViewordersComponent } from "./vieworders/vieworders.component";
import { ViewcustomersComponent } from "./viewcustomers/viewcustomers.component";

export const ADMINROUTES: Routes = [
    {path:"createtype", component:CreatetypeComponent},
    {path:"createproduct", component:CreateproductComponent},
    {path:"updateproduct", component:UpdateproductComponent},
    {path:"vieworders", component:ViewordersComponent},
    {path:"viewcustomers", component: ViewcustomersComponent}
]