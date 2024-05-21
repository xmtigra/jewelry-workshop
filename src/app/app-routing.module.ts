import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  // { path: 'materials', component: MaterialsComponent },
  // { path: 'sales', component: SalesComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
