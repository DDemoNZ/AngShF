import {Component, HostListener} from '@angular/core';
import {ItemModel} from '../../models/ItemModel';
import {AuthServiceComponent} from '../../service/auth-service/auth-service.component';
import {BucketComponent} from '../bucket/bucket.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {

  itemsOnPageList: ItemModel[] = [];
  errorMessage: string;
  currentPage = 0;
  itemsOnPage = 6;
  itemsInRow = 0;
  rowsOnPage = 0;

  noResize = true;

  itemsOnPageCounterList = [
    {name: '5', value: 5},
    {name: '10', value: 10},
    {name: '20', value: 20},
    {name: 'All', value: 100},
  ];

  public itemsInBucket: ItemModel[] = [];

  @HostListener('window:resize', ['$event'])
  onResize(event?): void {
    this.itemsInRow = Math.floor(window.innerWidth > 830 ? 830 / (200 + 50) : window.innerWidth / (200 + 20));
    this.rowsOnPage = Math.floor(window.innerHeight / (300 + 50));
    this.getItems(this.currentPage, this.itemsInRow * this.rowsOnPage);
  }

  constructor(private http: AuthServiceComponent,
              private bucket: BucketComponent) {
    this.itemsInRow = Math.floor(window.innerWidth > 830 ? 830 / (200 + 50) : window.innerWidth / (200 + 20));
    this.rowsOnPage = Math.floor(window.innerHeight / (300 + 50));
    this.getItems(this.currentPage, this.itemsInRow * this.rowsOnPage);
  }

  getItems(currentPage: number, itemsOnPage: number): void {
    this.http.getAllItem(currentPage, itemsOnPage).subscribe(res => {
        this.itemsOnPageList = res.content;
      },
      error => {
        this.errorMessage = error.toString();
      });
  }

  addItemToSB(item: ItemModel): void {
    // this.itemsSB.push(item);
    console.log('items - ' + this.itemsInBucket.forEach(console.log));
    this.bucket.addBucket(item);
    // this.itemsInBucket.push(item);
  }

  checkUser(): boolean {
    return sessionStorage.getItem('username') == null;
  }

  changePage(changePage: number): void {
    this.currentPage += changePage;
    this.getItems(this.currentPage, this.itemsOnPage);
  }

  changeItemsPerPage(itemsPerPage: number): void {
    this.noResize = true;
    this.itemsOnPage = itemsPerPage;
    this.getItems(this.currentPage, this.itemsOnPage);
  }
}
