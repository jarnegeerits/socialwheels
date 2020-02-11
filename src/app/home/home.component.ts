import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
// Font awesome imports
import { faSignal, faGlobeEurope } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faTwitterSquare, faInstagram } from '@fortawesome/fontawesome-free-brands';
import { AuthService } from '../../shared/services/auth.service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // font awesome icons doorgeven naar html, zet non-fa dingen onder volgende comment
  faSignal = faSignal;
  faGlobeEurope = faGlobeEurope;
  faFacebookSquare = faFacebookSquare;
  faTwitterSquare = faTwitterSquare;
  faInstagram = faInstagram;

  // BELANGRIJKE ONZIN NA DEZE COMMENT
  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit() {
    // if (!this.authService.isLoggedIn) {
    //   this.router.navigate(['/login']);
    // }
  }

}
