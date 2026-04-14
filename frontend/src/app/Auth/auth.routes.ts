import { Route, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { Forgot1Component } from "./forgot1/forgot1.component";
import { Forgot2Component } from "./forgot2/forgot2.component";
import { Forgot3Component } from "./forgot3/forgot3.component";

export const AUTHROUTES: Routes = [
    {path: "login", component:LoginComponent},
    {path:"register", component:RegisterComponent},
    {path:"forgot1", component:Forgot1Component},
    {path:"forgot2", component:Forgot2Component},
    {path:"forgot3", component: Forgot3Component}
]