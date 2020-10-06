import {User} from './user';
import {ItemModel} from './ItemModel';

export class Orders {
  id: string;
  user: User;
  items: ItemModel[];
  price: number;
}
