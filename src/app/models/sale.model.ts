import {Product} from "./product.model";

export interface Sale {
  key?: string;
  product: Product;
  date: string;
  surname: string;
  name: string;
  patronymic: string;
}
