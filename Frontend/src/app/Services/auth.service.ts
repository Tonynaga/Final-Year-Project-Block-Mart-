import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { GithubAuthProvider } from 'firebase/auth';
import { FacebookAuthProvider } from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router : Router) { }

  //Login
  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword( email, password).then( res => {
      localStorage.setItem('token','true');
      this.router.navigate(['dashboard']);

      if(res.user?.emailVerified == true) {
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['/verify-email']);
      }
    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }

  //Registration
  register(email : string, password : string) {
    this.fireauth.createUserWithEmailAndPassword( email, password).then( res => {
      alert('User Registration Successful');
      this.router.navigate(['/login']);
      this.sendEmailForVarification(res.user);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  //Logout
  logout() {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  //Forgot Password
  forgotPassword(email : string) {
    this.fireauth.sendPasswordResetEmail(email).then( () => {
      this.router.navigate(['/verify-email']);
    }, err => {
      alert('Something Went Wrong');
    })
  }

  //Email Verification
  sendEmailForVarification(user : any) {
    user.sendEmailForVarification().then( (res : any) => {
      this.router.navigate(['/verify-email']);
    }, (err : any) => {
      alert('Something went wrong. Unable to send Mail to your Registered EMail');
    })
  }

  //Sign In With Google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then( res => {
      this.router.navigate(['/dashboard']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));
    }, err => {
      alert(err.message);
    })
  }

  facebookSignIn() {
    return this.fireauth.signInWithPopup(new FacebookAuthProvider).then( res => {
      this.router.navigate(['/dashboard']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));
    }, err => {
      alert(err.message);
    })
  }
}
