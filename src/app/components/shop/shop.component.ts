import {Component, OnInit} from '@angular/core';
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
  itemsOnPageCounterList = [
    {name: '5', value: 5},
    {name: '10', value: 10},
    {name: '20', value: 20},
    {name: 'All', value: 100},
  ];

  public itemsInBucket: ItemModel[] = [];

  // constructor(private http: AuthServiceComponent,
  //             private bucket: BucketComponent) {
  // }

  // ngOnInit(): void {
  //   this.getItems(this.currentPage, this.itemsOnPage);
  // }

  constructor(private http: AuthServiceComponent,
              private bucket: BucketComponent) {
    this.getItems(this.currentPage, this.itemsOnPage);
  }

  getItems(currentPage: number, itemsOnPage: number): void {
    console.log('Page ' + currentPage + '  items on page ' + itemsOnPage);

    this.http.getAllItem(currentPage, itemsOnPage).subscribe(res => {
      console.log('res', res);
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

  // refreshPage() {
  //   this.getItems()
  // }
  // getPages(): number {
  //   return this.http.getPages();
  // }
  changePage(changePage: number): void {
    this.currentPage += changePage;
    this.getItems(this.currentPage, this.itemsOnPage);
  }

  changeItemsPerPage(itemsPerPage: number): void {
    this.itemsOnPage = itemsPerPage;
    this.getItems(this.currentPage, this.itemsOnPage);
  }
}
