import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cars, Users } from '../../shared/models/user.models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public car$: Observable<Cars[]>;
  public user$: Observable<Users[]>;
  public currentUID$ = '';
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    (async () => {
      this.currentUID$ = this.authService.userUID;
      this.car$ = this.authService.getCars();
      this.user$ = this.authService.getUsers();
      await this.authService.redirectDelay(1000);
      console.log('user is logged in: ' + this.authService.isLoggedIn);
      console.log('with UID:  ' + this.authService.userUID);
      if (!this.authService.isLoggedIn) { this.router.navigate(['/login']); }
    })();
  }

}
