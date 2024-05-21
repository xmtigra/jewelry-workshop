import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth.guard";
import {MaterialsComponent} from "./materials/materials.component";
import {SalesComponent} from "./sales/sales.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'materials', component: MaterialsComponent },
  { path: 'sales', component: SalesComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
