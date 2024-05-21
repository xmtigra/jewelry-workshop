import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Product} from "../models/product.model";
import {ProductService} from "../services/product.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  productsForm: FormGroup;
  products$: Observable<Product[]>;
  public materials = ['золото', 'срібло', 'платина', 'золото з діамантами', 'срібло з діамантами'];
  public types = ['сережки', 'каблучки', 'брошки', 'браслети'];

  displayedColumns: string[] = ['name', 'type', 'material', 'weight', 'price', 'actions'];
  key: string = '';

  constructor(private fb: FormBuilder, private productService: ProductService, private _snackBar: MatSnackBar) {
    this.productsForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      material: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
    });

    this.products$ = this.productService.getProducts().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    ) as Observable<Product[]>;
  }

  onSubmit(): void {
    this.productsForm.valid ? this.key ? this.onUpdateProduct() : this.onCreateProduct() : this.productsForm.markAllAsTouched();
  }

  onCreateProduct(): void {
    const newProduct: Product = this.productsForm.value;
    this.productService.createProduct(newProduct);
    this._snackBar.open('Виріб додано', '', {duration: 2000});
    this.resetForm();
  }

  onUpdateProduct(): void {
    const updatedProduct: Product = this.productsForm.value;
    this.productService.updateProduct(this.key, updatedProduct);
    this._snackBar.open('Виріб оновлено', '', {duration: 2000});
    this.resetForm();
  }

  resetForm(): void {
    this.key = '';
    this.productsForm.reset();
  }

  onUpdate(product: Product): void {
    if (product.key) {
      this.key = product.key;
      this.productsForm.setValue({
        name: product.name,
        type: product.type,
        material: product.material,
        weight: product.weight,
        price: product.price
      });
    }
  }

  onDelete(key: string): void {
    this.resetForm();
    this.productService.deleteProduct(key);
    this._snackBar.open('Виріб видалено', '', {duration: 2000});
  }

}
