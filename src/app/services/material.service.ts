import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Material} from "../models/material.model";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private dbPath = '/materials';

  constructor(private db: AngularFireDatabase) {
  }

  createMaterial(material: Material) {
    return this.db.list(this.dbPath).push(material);
  }

  updateMaterial(key: string, material: Material) {
    return this.db.list(this.dbPath).update(key, material);
  }

  deleteMaterial(key: string) {
    return this.db.list(this.dbPath).remove(key);
  }

  getMaterials() {
    return this.db.list(this.dbPath).snapshotChanges();
  }
}
