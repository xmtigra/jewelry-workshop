export interface Product {
  key?: string;
  name: string;
  type: ProductType;
  material: ProductMaterial;
  weight: number;
  price: number;
}

export type ProductType = 'сережки' | 'каблучки' | 'брошки' | 'браслети';

export type ProductMaterial = 'золото' | 'срібло' | 'платина' | 'золото з діамантами' | 'срібло з діамантами';
