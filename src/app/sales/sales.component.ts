import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Product} from "../models/product.model";
import {Material} from "../models/material.model";
import {ProductService} from "../services/product.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {map} from "rxjs/operators";
import {Sale} from "../models/sale.model";
import {SaleService} from "../services/sale.service";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
})
export class SalesComponent {
  form: FormGroup;
  products$: Observable<Product[]>;
  sales$: Observable<Sale[]>;

  public products: Product[] = [];

  displayedColumns: string[] = ['product', 'date', 'surname', 'name', 'patronymic', 'actions'];
  key: string = '';

  constructor(private fb: FormBuilder, private productService: ProductService, private saleService: SaleService, private _snackBar: MatSnackBar) {

    this.form = this.fb.group({
      product: ['', Validators.required],
      date: ['', Validators.required],
      surname: ['', Validators.required],
      name: ['', Validators.required],
      patronymic: ['', Validators.required],
    });

    this.products$ = this.productService.getProducts().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    ) as Observable<Product[]>;

    this.sales$ = this.saleService.getSales().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    ) as Observable<Sale[]>;

    this.products$.subscribe(products => {
      this.products = products;
    });
  }

  onSubmit(): void {
    this.form.valid ? this.key ? this.onUpdateSale() : this.onCreateSale() : this.form.markAllAsTouched();
  }

  onCreateSale(): void {
    const newProduct: Sale = this.form.value;
    this.saleService.createSale(newProduct);
    this._snackBar.open('Продаж додано', '', {duration: 2000});
    this.resetForm();
  }

  onUpdateSale(): void {
    const updatedSale: Sale = this.form.value;
    this.saleService.updateSale(this.key, updatedSale);
    this._snackBar.open('Продаж оновлено', '', {duration: 2000});
    this.resetForm();
  }

  resetForm(): void {
    this.key = '';
    this.form.reset();
  }

  onUpdate(sale: Sale): void {
    if (sale.key) {
      this.key = sale.key;
      this.form.setValue({
        product: sale.product,
        date: sale.date,
        surname: sale.surname,
        name: sale.name,
        patronymic: sale.patronymic,
      });
    }
  }

  onDelete(key: string): void {
    this.resetForm();
    this.saleService.deleteSale(key);
    this._snackBar.open('Продаж видалено', '', {duration: 2000});
  }

  getProductName(key: any) {
    const product = this.products.find(m => m.key === key);
    return product ? product.name : '';
  }
}
