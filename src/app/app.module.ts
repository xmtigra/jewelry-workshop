import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ProductsComponent } from './products/products.component';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import { LoginComponent } from './login/login.component';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle
} from "@angular/material/card";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatToolbar} from "@angular/material/toolbar";
import {MatTooltip} from "@angular/material/tooltip";
import {NgOptimizedImage} from "@angular/common";
import { MaterialsComponent } from './materials/materials.component';
import { SalesComponent } from './sales/sales.component';
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatSort} from "@angular/material/sort";

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    LoginComponent,
    MaterialsComponent,
    SalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    MatColumnDef,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatCard,
    MatCardActions,
    MatCardSubtitle,
    MatCardHeader,
    MatCardContent,
    MatCardImage,
    MatSidenavContent,
    MatListItem,
    MatNavList,
    MatSidenav,
    MatSidenavContainer,
    MatToolbar,
    MatTooltip,
    NgOptimizedImage,
    MatOption,
    MatSelect,
    MatSort,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
