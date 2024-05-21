import { Component } from '@angular/core';
import {filter} from "rxjs";
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import firebase from "firebase/compat";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public user: firebase.User | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.getAuthState().pipe(
      filter(Boolean)
    ).subscribe(user => {
      this.user = user
    });
  }

  async signOut() {
    await this.authService.signOut().then(() => {
      this.user = null;
      this.router.navigate(['/login']);
    });
  }

}
