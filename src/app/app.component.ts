import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MediaObserver} from '@angular/flex-layout';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'sh-f';

  constructor() {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }
}
