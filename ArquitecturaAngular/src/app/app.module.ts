import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule aquí
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterAsistanceComponent } from './components/register-asistance/register-asistance.component';
import { AlumnosService } from './components/dashboard/alumnos.service';
const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch: 'full'},
  {path: 'login', component:LoginComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'register-asistance', component:RegisterAsistanceComponent},
  {path: '**', redirectTo:'login', pathMatch: 'full'}
];
@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClient,
    RouterModule.forRoot(routes), // Configurar las rutas en RouterModule,
    
  ],
  providers: [
    AlumnosService
  ]
})
export class AppModule { }