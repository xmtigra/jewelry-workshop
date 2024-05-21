import {Sale} from "../models/sale.model";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private dbPath = '/sales';

  constructor(private db: AngularFireDatabase) {
  }

  createSale(sale: Sale) {
    return this.db.list(this.dbPath).push(sale);
  }

  updateSale(key: string, sale: Sale) {
    return this.db.list(this.dbPath).update(key, sale);
  }

  deleteSale(key: string) {
    return this.db.list(this.dbPath).remove(key);
  }

  getSales() {
    return this.db.list(this.dbPath).snapshotChanges();
  }
}
