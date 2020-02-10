
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service.service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
// import { Cars } from '../assets/data/cars.json'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

 
export class AppComponent {
  title = 'SocialWheels';
  constructor(public authService: AuthService, private http:HttpClient) {}
  ngOnInit() {
    this.http
    .get<Expenses[]>('../assets/data/cars.json')
    .pipe (
      tap (result => console.log('opgehaald via JSON: ', result))
      .subscribe(expenses => this.expenses = expenses)

};
