import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { delay } from 'rxjs';

@Component({
  selector: 'app-register-asistance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register-asistance.component.html',
  styleUrls: ['./register-asistance.component.css']
})
export class RegisterAsistanceComponent implements OnInit {
  constructor(public auth: AuthService) { }
  nombre = '';
  correo = '';
  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.auth.user$.subscribe((user) => {
          if (user) {
            this.nombre = user.name || ''; // Use empty string as default if email is undefined
            this.correo = user.email || '';   // Use empty string as default if name is undefined
          }
        });
      }
    });
  }
  registerAsistance() {
    const alumnoId = (document.getElementById('alumnoId') as HTMLInputElement).value;
    const url = 'http://192.168.4.1/register?id=' + encodeURIComponent(alumnoId) + '&name=' + encodeURIComponent(this.nombre) + '&email=' + encodeURIComponent(this.correo);
    console.log(url);
    delay(1000);
    window.location.href = url;
  }

  logOut() {
    this.auth.logout();
  }
}