import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Product} from "./product.model";
import {ProductService} from "./product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productsForm: FormGroup;
  products$: Observable<Product[]>;

  displayedColumns: string[] = ['name', 'type', 'material', 'weight', 'price', 'actions'];

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productsForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      material: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
    });

    this.products$ = this.productService.getProducts().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ) as Observable<Product[]>;
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.productsForm.valid) {
      const newProduct: Product = this.productsForm.value;
      this.productService.createProduct(newProduct);
      this.productsForm.reset();
    }
  }

  onUpdate(product: Product): void {
    if (product.key) {
      this.productService.updateProduct(product.key, {
        name: product.name,
        type: product.type,
        material: product.material,
        weight: product.weight,
        price: product.price
      });
    }
  }

  onDelete(key: string): void {
    this.productService.deleteProduct(key);
  }
}
