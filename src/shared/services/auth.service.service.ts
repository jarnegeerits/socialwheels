import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cars, Users } from '../models/user.models';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { async } from '@angular/core/testing';

// Voorlopig disabled, mogelijk in de toekomst nog nodig
// import { User } from 'firebase';
// import { auth } from 'firebase/app';
// import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  urllocal = 'http://localhost:3000/cars';
  urllocal2 = 'http://localhost:3000/users';
  user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  constructor(public afAuth: AngularFireAuth, public router: Router, private http: HttpClient, private firestore: AngularFirestore) {
    this.user = afAuth.authState;
    this.user.subscribe((user) => {
      if (user) {
        this.userDetails = user;
      } else {
        this.userDetails = null;
      }
    });
  }
  async register(email: string, regName: string, password: string, password2: string) {
    if (password === password2) {
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
      title: 'You are about to be logged in! Please wait while we complete the registration.',
      showConfirmButton: false,
      timer: 10000
      });
      await this.newUser(regName);
      this.router.navigate(['home']);
    } else {
      swal.fire({
        title: 'Error!',
        text: 'Passwords did not match!',
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    }
  }
  async newUser(newName: string) {
    // Firebase tijd geven voor UID te leveren
    await this.redirectDelay(2500);
    const regUID = this.userUID;
    await this.redirectDelay(2500);

    // headers declareren en body opvullen om met de POST mee te sturen
    const headers = new HttpHeaders().set('content', 'application/json');
    const body = { UID : regUID, userName : newName, cost : 0, carId: 0};

    // Post request om nieuwe user weg te schrijven
    return this.http.post(this.urllocal2, body, { headers }).subscribe(
      data => {
        console.log('Post success ', data);
      }
    );
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
    this.router.navigate(['/home']);
    swal.fire({
      title: 'Goodbye!',
      text: 'You are now signed out',
      icon: 'error',
      confirmButtonText: 'Cool'
    });
  }
  get isLoggedIn(): boolean {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }
  redirectDelay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  get userUID(): string {
    return this.isLoggedIn ? this.userDetails.uid : null;
  }
  getCars(): Observable<any> {
    return this.http
      .get<Cars[]>(this.urllocal)
      .pipe();
  }
  getUsers(): Observable<any[]> {
    return this.http
      .get<Users[]>(this.urllocal2)
      .pipe();
  }
  editCost(newCost) {
    const headers = new HttpHeaders().set("content", "application/json");
    return this.http.put(this.urllocal2 + '/' + newCost.id, newCost, { headers }).subscribe(
      data => {
        console.log('Put success ', data);
      }
    );
  }
  editCar(newCar) {
    const headers = new HttpHeaders().set("content", "application/json");
    console.log(newCar.id)
    return this.http.put(this.urllocal + '/' + newCar.id, newCar, { headers }).subscribe(
      data => {
        console.log('Put success ', data);
      }
    );
  }
}
