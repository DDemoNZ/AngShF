import {ItemModel} from './ItemModel';

export class ItemPageModel {
  content: ItemModel[] = [];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
