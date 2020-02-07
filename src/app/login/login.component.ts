import { Component, OnInit } from '@angular/core';
import { faFacebookSquare, faTwitterSquare, faInstagram } from '@fortawesome/fontawesome-free-brands';
import { AuthService } from '../../shared/services/auth.service.service';
@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 constructor(private authService: AuthService) { }
 ngOnInit() {}
}