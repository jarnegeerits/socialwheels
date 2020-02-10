import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

// import * as firebase from 'firebase/app';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
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
}

// async login(email: string, password: string) {
  //   try {
  //     await this.afAuth.auth.signInWithEmailAndPassword(email, password);
  //     this.router.navigate(['/home']);
  //     console.log('sign in done');
  //   } catch (e) {
  //     alert('Error!' + e.message);
  //     console.log('login failed');
  //     }
  //   }



        // window.history.back();
