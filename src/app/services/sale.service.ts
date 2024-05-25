import {Sale} from "../models/sale.model";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private dbPath = '/sales';

  constructor(private db: AngularFireDatabase) {
  }

  createSale(product: Sale): void {
    this.db.list(this.dbPath).push(product);
  }

  updateSale(key: string, value: any): Promise<void> {
    return this.db.list(this.dbPath).update(key, value);
  }

  deleteSale(key: string): Promise<void> {
    return this.db.list(this.dbPath).remove(key);
  }

  getSales(): AngularFireList<Sale> {
    return this.db.list(this.dbPath);
  }
}
