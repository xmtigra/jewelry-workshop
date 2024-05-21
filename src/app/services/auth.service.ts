import {Injectable} from '@angular/core';
import {GoogleAuthProvider} from "firebase/auth";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {
  }

  async googleSignIn() {
    const provider = new GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return credential.user;
  }

  async signOut() {
    await this.afAuth.signOut();
  }

  getAuthState() {
    return this.afAuth.authState;
  }
}
