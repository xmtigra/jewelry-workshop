import {Product} from "./product.model";

export interface Sale {
  key?: string;
  product: Product;
  saleDate: Date;
  customerLastName: string;
  customerFirstName: string;
  customerMiddleName: string;
}
