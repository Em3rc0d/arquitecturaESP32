import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.auth.user$.subscribe((user) => {
          if (user?.email == 'jaimeparionaquispe@gmail.com' ) {
            //password:arquitecturaESP32!
            this.router.navigate(['dashboard']);
          } else {
            this.router.navigate(['register-asistance']);
          }
        });
      }
    });
  }

  login(): void {
    this.auth.loginWithRedirect();
  }

}
