import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Font awesome imports
import { faSignal, faGlobeEurope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // font awesome icons doorgeven naar html, zet non-fa dingen onder volgende comment
  faSignal = faSignal;
  faGlobeEurope = faGlobeEurope;

  // BELANGRIJKE ONZIN NA DEZE COMMENT
  constructor(private router: Router) { }

  ngOnInit() {
  }

}
