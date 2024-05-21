import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user: any;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.getAuthState().subscribe(user => {
      this.user = user;
      this.router.navigate(['/products']);
    });
  }

  async googleSignIn() {
    await this.authService.googleSignIn();
  }

  async signOut() {
    await this.authService.signOut();
  }
}
