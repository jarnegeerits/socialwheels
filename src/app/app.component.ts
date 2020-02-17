
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service.service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Cars } from '../shared/models/user.models';
import Swal from 'sweetalert2';
// import { Cars } from '../assets/data/cars.json'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'SocialWheels';
  cars: Cars[];

  constructor(public authService: AuthService) {}
  ngOnInit() {
    this.authService.getCars().subscribe(cars => this.cars = cars);
  }
}
