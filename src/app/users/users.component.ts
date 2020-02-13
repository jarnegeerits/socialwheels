import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cars, Users, CarOwners } from '../../shared/models/user.models';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public car$: Observable<Cars[]>;
  public user$: Observable<Users[]>;
  public carOwner$: Observable<CarOwners[]>;
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  // getCarOwners = () =>
  // this.authService
  //   .getCarOwners()
  //   .subscribe(res => (this.carOwner$ = res));

  ngOnInit() {
    if (!this.authService.isLoggedIn) { this.router.navigate(['/login']); }
    this.car$ = this.authService.getCars();
    this.user$ = this.authService.getUsers();
    // this.getCarOwners();
  }

}
