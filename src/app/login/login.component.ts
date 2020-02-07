import { Component, OnInit } from '@angular/core';
import { faFacebookSquare, faTwitterSquare, faInstagram } from '@fortawesome/fontawesome-free-brands';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faFacebookSquare = faFacebookSquare;
  faTwitterSquare = faTwitterSquare;
  faInstagram = faInstagram;

  constructor() { }

  ngOnInit() {
  }

}
