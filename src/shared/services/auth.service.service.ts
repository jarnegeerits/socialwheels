import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Cars, Users } from '../models/user.models';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

// import * as firebase from 'firebase/app';
import swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  urllocal = "http://localhost:3000/cars";
  user: User;
  constructor(public afAuth: AngularFireAuth, public router: Router, private http: HttpClient) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }
  register(email: string, password: string) {
    this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .catch(err => {
        swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Cool'
        });
    });
    swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'You are now registered and logged in!',
      showConfirmButton: false,
      timer: 2000
    });
  }

  login(email: string, password: string) {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        this.router.navigate(['home']);
        swal.fire({
          title: 'Signed in!',
          // text: err.message,
          icon: 'success',
          confirmButtonText: 'Cool'
        });
      })
      .catch(err => {
        swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Cool'
        });
        console.log('Something went wrong:', err.message);
      });
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
    swal.fire({
      title: 'Goodbye!',
      text: 'You are now signed out',
      icon: 'error',
      confirmButtonText: 'Cool'
    });
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  getCars(): Observable<any> {
      return this.http
      .get<Cars>(this.urllocal)
      .pipe();
      }

   getUsers(): Observable<any[]> {
      return this.http
      // .get<Users[]>('../../assets/data/cars.json')
      .get<Users[]>(this.urllocal)
      .pipe();
      }
   editCost(value): Observable<any> {
    return this.http
    .get<Cars>('../../assets/data/cars.json')
    .pipe();
    // return this.http.delete(this.urllocal+`/${value}`)
    }
}
