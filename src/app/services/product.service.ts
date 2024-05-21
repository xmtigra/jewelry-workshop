import {Injectable} from '@angular/core';
import {Product} from '../models/product.model';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private dbPath = '/products';

  constructor(private db: AngularFireDatabase) {
  }

  createProduct(product: Product): void {
    this.db.list(this.dbPath).push(product);
  }

  updateProduct(key: string, value: any): Promise<void> {
    return this.db.list(this.dbPath).update(key, value);
  }

  deleteProduct(key: string): Promise<void> {
    return this.db.list(this.dbPath).remove(key);
  }

  getProducts(): AngularFireList<Product> {
    return this.db.list(this.dbPath);
  }
}
