import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Material} from "../models/material.model";
import {MaterialService} from "../services/material.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrl: './materials.component.scss'
})
export class MaterialsComponent {
  form: FormGroup;
  materials$: Observable<Material[]>;

  displayedColumns: string[] = ['name', 'price', 'actions'];
  key: string = '';

  constructor(private fb: FormBuilder, private materialService: MaterialService, private _snackBar: MatSnackBar) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });

    this.materials$ = this.materialService.getMaterials().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    ) as Observable<Material[]>;
  }

  onSubmit(): void {
    this.form.valid ? this.key ? this.onUpdateMaterial() : this.onCreateMaterial() : this.form.markAllAsTouched();
  }

  onCreateMaterial(): void {
    const newMaterial: Material = this.form.value;
    this.materialService.createMaterial(newMaterial);
    this._snackBar.open('Матеріал додано', '', {duration: 2000});
    this.resetForm();
  }

  onUpdateMaterial(): void {
    const updatedMaterial: Material = this.form.value;
    this.materialService.updateMaterial(this.key, updatedMaterial);
    this._snackBar.open('Матеріал оновлено', '', {duration: 2000});
    this.resetForm();
  }

  resetForm(): void {
    this.key = '';
    this.form.reset();
  }

  onUpdate(material: Material): void {
    if (material.key) {
      this.key = material.key;
      this.form.setValue({
        name: material.name,
        price: material.price
      });
    }
  }

  onDelete(key: string): void {
    this.resetForm();
    this.materialService.deleteMaterial(key);
    this._snackBar.open('Матеріал видалено', '', {duration: 2000});
  }

}
