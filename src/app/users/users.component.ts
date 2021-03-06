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
  public editUser$: Observable<Users>;
  public editCar$: Observable<Cars>;
  public currentUID$ = '';
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  public pay(userValue, payAmount) {
    if(payAmount > 0 && payAmount <= userValue.cost){
      userValue.cost -= payAmount;
      this.editUser$ = userValue;
      console.log(this.editUser$);
      this.authService.editCost(this.editUser$);
    }
  }

  public fuel(carValue, newFuel) {
    if (newFuel >= 0) {
      carValue.fuelAmount = newFuel;
      this.editCar$ = carValue;
      console.log(carValue.id)
      this.authService.editCar(this.editCar$);
    }
  }

  ngOnInit() {
    (async () => {
      await this.authService.redirectDelay(1000);
      this.currentUID$ = this.authService.userUID;
      this.car$ = this.authService.getCars();
      this.user$ = this.authService.getUsers();
      console.log('user is logged in: ' + this.authService.isLoggedIn);
      console.log('with UID:  ' + this.authService.userUID);
      if (!this.authService.isLoggedIn) { this.router.navigate(['/login']); }
    })();
  }

}
