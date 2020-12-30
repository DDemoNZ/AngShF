import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page-component',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  errorMessage: string;

  constructor() {}

  ngOnInit(): void {
    console.log(history.state.errorMsg);
    this.errorMessage = history.state.errorMsg;
  }

}
