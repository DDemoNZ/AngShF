import {ItemModel} from './ItemModel';

export class OrderRequest {
  userId: string;
  orderItems: ItemModel[] = [];
  price: number;
}
