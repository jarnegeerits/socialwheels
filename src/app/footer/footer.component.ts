import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFacebookSquare, faTwitterSquare, faInstagram } from '@fortawesome/fontawesome-free-brands';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faFacebookSquare = faFacebookSquare;
  faTwitterSquare = faTwitterSquare;
  faInstagram = faInstagram;

  constructor(public router: Router) { }

  ngOnInit() {
  }

}
