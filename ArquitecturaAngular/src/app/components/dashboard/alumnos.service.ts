import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AlumnosService {
  private apiUrl = 'http://192.168.4.2:3000';

  constructor(public http: HttpClient) { }

  getReporteAsistencias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/asistencias`);
  }

  getListadoAlumnos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/alumnos`);
  }
}
