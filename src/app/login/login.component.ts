import { Component, OnInit } from '@angular/core';
// Eigenlijk niet meer nodig sinds icons in modulaire footer staan nu
// import { faFacebookSquare, faTwitterSquare, faInstagram } from '@fortawesome/fontawesome-free-brands';
import { AuthService } from '../../shared/services/auth.service.service';
import 'firebase/firestore';
@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 constructor(public authService: AuthService) { }
 ngOnInit() {}
}
