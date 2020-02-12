import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cars, Users } from '../../shared/models/user.models';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  public car$: Observable<Cars>;
  public user$: Observable<Users[]>;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }
    
  ngOnInit() {
    if (!this.authService.isLoggedIn) { this.router.navigate(['/login']); }
    this.car$ = this.authService.getCars();
    this.user$ = this.authService.getUsers();
  }

}
