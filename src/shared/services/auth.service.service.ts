import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
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
  async login(email: string, password: string) {
  try {
    await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    this.router.navigate(['/home']);
    console.log('sign in done');
  } catch (e) {
    swal.fire({
      title: 'Error!',
      text: e.message,
      icon: 'error',
      confirmButtonText: 'Cool'
    });
    alert('Error!' + e.message);
    console.log('login failed');
  }
  }
  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }
}
