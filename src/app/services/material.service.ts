import {Injectable} from '@angular/core';
import {Material} from '../models/material.model';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private dbPath = '/materials';

  constructor(private db: AngularFireDatabase) {
  }

  createMaterial(product: Material): void {
    this.db.list(this.dbPath).push(product);
  }

  updateMaterial(key: string, value: any): Promise<void> {
    return this.db.list(this.dbPath).update(key, value);
  }

  deleteMaterial(key: string): Promise<void> {
    return this.db.list(this.dbPath).remove(key);
  }

  getMaterials(): AngularFireList<Material> {
    return this.db.list(this.dbPath);
  }
}
