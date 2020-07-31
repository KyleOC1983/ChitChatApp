import { Injectable } from '@angular/core';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public auth: AngularFireAuth, private router: Router) {
  }
  login() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(val=>{
    this.router.navigate(['/chat'])
  }
    )
  }
  logout() {
    this.auth.signOut().then( val=>
    this.router.navigate(['/'])
    )
  }
}
