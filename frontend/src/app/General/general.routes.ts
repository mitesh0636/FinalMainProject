import { Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { ProductdetailsComponent } from "./productdetails/productdetails.component";
import { AboutComponent } from "./about/about.component";
import { ProfileComponent } from "./profile/profile.component";
import { UpdateprofileComponent } from "./updateprofile/updateprofile.component";
import { authguardGuard } from "../Auth/guard/authguard/authguard.guard";

export const GENERALROUTES: Routes = [
    {path:"", component:HomePageComponent},
    {path:"productdetails/:id", component: ProductdetailsComponent},
    {path:"about", component: AboutComponent},
    {path:"profile", canActivate: [authguardGuard], component: ProfileComponent},
    {path:"update/:id", canActivate:[authguardGuard], component: UpdateprofileComponent}
]