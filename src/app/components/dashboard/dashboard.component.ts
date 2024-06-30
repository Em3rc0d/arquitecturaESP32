import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { delay } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe, CommonModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  asistencias: any[] = [];
  alumnos: any[] = [];
  isActivated: boolean = false;
  private apiUrl = 'http://192.168.4.2:3000';

  constructor(public auth: AuthService, private http: HttpClient) { }



  logOut() {
    this.auth.logout();
  }

  reporteAsistencias() {
    const url = `${this.apiUrl}/asistencias`;
    window.location.href = url;
    // this.http.get<any[]>(`${this.apiUrl}/asistencias`).subscribe(
    //   data => {
    //     this.asistencias = data;
    //     this.isActivated = true;
    //   },
    //   error => {
    //     console.error('Error al obtener reporte de asistencias:', error);
    //     // Manejo de errores si es necesario
    //   }
    // );
  }

  listadoAlumnos() {
    const url = `${this.apiUrl}/alumnos`;
    window.location.href = url;
    //   this.http.get<any[]>(`${this.apiUrl}/alumnos`).subscribe(
    //     data => {
    //       this.alumnos = data;
    //       this.isActivated = false;
    //     },
    //     error => {
    //       console.error('Error al obtener listado de alumnos:', error);
    //       // Manejo de errores si es necesario
    //     }
    //   );
    // }
  }
}