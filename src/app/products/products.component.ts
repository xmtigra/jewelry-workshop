import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Product} from "../models/product.model";
import {ProductService} from "../services/product.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Material} from "../models/material.model";
import { MaterialService } from '../services/material.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  productsForm: FormGroup;
  products$: Observable<Product[]>;
  public types = ['сережки', 'каблучки', 'брошки', 'браслети'];
  public materials$: Observable<Material[]>;
  public selectedMaterial: Material | undefined;
  public materials: Material[] = [];

  displayedColumns: string[] = ['name', 'type', 'material', 'weight', 'price', 'actions'];
  key: string = '';

  constructor(private fb: FormBuilder, private productService: ProductService, private _snackBar: MatSnackBar, private materialService: MaterialService) {

    this.productsForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      material: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]]
    });

    this.productsForm.get('material')?.valueChanges.subscribe((key: Material['key']) => {
      const material = this.materials$.pipe(
        map(materials => materials.find(m => m.key === key))
      );
      material.subscribe(material => {
        this.selectedMaterial = material;
        const weight = this.productsForm.get('weight')?.value;
        if (material) {
          const price = Number(material.price * weight).toFixed(2);
          this.productsForm.get('price')?.setValue(price);
        }
      });
    });

    this.productsForm.get('weight')?.valueChanges.subscribe((weight: number) => {
      const material = this.selectedMaterial;
      if (material) {
        const price = Number(material.price * weight).toFixed(2);
        this.productsForm.get('price')?.setValue(price);
      }
    });

    this.products$ = this.productService.getProducts().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    ) as Observable<Product[]>;

    this.materials$ = this.materialService.getMaterials().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    ) as Observable<Material[]>;

    this.materials$.subscribe(materials => this.materials = materials);
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

  getMaterialName(key: any) {
    const material = this.materials.find(m => m.key === key);
    return material ? material.name : '';
  }
}
