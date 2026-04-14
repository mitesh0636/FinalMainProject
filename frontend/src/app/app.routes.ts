import { Routes } from '@angular/router';
import { authguardGuard } from './Auth/guard/authguard/authguard.guard';
import { adminguardGuard } from './Auth/guard/adminguard/adminguard.guard';

export const routes: Routes = [
{path: "", redirectTo:"general", pathMatch: "full"},
{
    path:"auth",
    loadChildren: () => import('./Auth/auth.routes').then(m => m.AUTHROUTES)
},
{
    path:"cart",
    canActivate: [authguardGuard],
    loadChildren: () => import('./Cart/cart.routes').then(m => m.CARTROUTES)   
},
{
    path:"order",
    canActivate: [authguardGuard],
    loadChildren: () => import('./Order/order.routes').then(m => m.ORDERROUTES)
},
{
    path:"general",
    loadChildren: () => import('./General/general.routes').then(m => m.GENERALROUTES)
},
{
    path:"admin",
    canActivate: [authguardGuard, adminguardGuard],
    loadChildren: () => import('./Admin/admin.routes').then(m => m.ADMINROUTES)
},
];
