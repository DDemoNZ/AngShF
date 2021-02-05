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
    {name: '6', value: 6},
    {name: '12', value: 12},
    {name: '15', value: 15},
    {name: 'All', value: 100},
  ];

  public itemsInBucket: ItemModel[] = [];
  minPage = true;
  maxPage = false;

  @HostListener('window:resize', ['$event'])
  onResize(event?): void {
    this.itemsOnPage = this.getItemsCount();
    this.getItems(this.currentPage > 0 ? this.currentPage-- : this.currentPage, this.itemsOnPage);
  }
  constructor(private http: AuthServiceComponent,
              private bucket: BucketComponent) {
    this.itemsOnPage = this.getItemsCount();
    this.getItems(this.currentPage, this.itemsOnPage);
  }

  getItems(currentPage: number, itemsOnPage: number): void {
    this.http.getAllItem(currentPage, itemsOnPage).subscribe(res => {
        this.itemsOnPageList = res.content;
        this.maxPage = currentPage === res.totalPages - 1;
        this.minPage = currentPage === 0;
        console.log(`
        max page ? - ${this.maxPage}
        min page ? - ${this.minPage}
        current page ? - ${this.currentPage}
        `);
      },
      error => {
        this.errorMessage = error.toString();
        if (this.currentPage > 0) {
          this.getItems(this.currentPage--, this.itemsOnPage);
        }
      });
  }

  addItemToSB(item: ItemModel): void {
    console.log('items - ' + this.itemsInBucket.forEach(console.log));
    this.bucket.addBucket(item);
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

  private getItemsCount(): number {
    this.itemsInRow = Math.floor(window.innerWidth > 830 ? 830 / (200 + 50) : window.innerWidth / (200 + 20));
    this.rowsOnPage = Math.floor(window.innerHeight / (300 + 50));
    const itemCount = this.itemsInRow * this.rowsOnPage > 0 ? this.itemsInRow * this.rowsOnPage : 3;
    return itemCount;
  }
}
