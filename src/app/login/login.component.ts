import {Component} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) {
    this.authService.getAuthState().subscribe(user => {
      this.router.navigate(['/products']);
    });
  }

  async googleSignIn() {
    await this.authService.googleSignIn();
  }
}
