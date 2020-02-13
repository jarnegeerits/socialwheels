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
  public car$: Observable<Cars[]>;
  public user$: Observable<Users[]>;
  public newUser$: Observable<Users>;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

    editCost(value) {
      this.authService.editCost(value).subscribe();
    // ik gebruik de subscribe om de observable uit te voeren
    this.router.navigate(['/dash']);
    }
    // addCost(value)
    // {
    //   this.authService.AddCost(value).subscribe();
    //   //Net zoals pokemon iets wegschrijven in de json-server
    //   this.router.navigate(['/dash']);
    // }

  ngOnInit() {
    if (!this.authService.isLoggedIn) { this.router.navigate(['/login']); }
    this.car$ = this.authService.getCars();
    this.user$ = this.authService.getUsers();
    console.log('user is logged in: ' + this.authService.isLoggedIn);
    console.log('with UID:  ' + this.authService.userUID);
  }

}
