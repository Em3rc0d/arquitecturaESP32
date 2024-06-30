import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterAsistanceComponent } from './components/register-asistance/register-asistance.component';
import { HttpClientModuleModule } from './http-client-module';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch: 'full'},
  {path: 'login', component:LoginComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'register-asistance', component:RegisterAsistanceComponent},
  {path: '**', redirectTo:'login', pathMatch: 'full'}
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes) // Configura las rutas principales usando forRoot()
  ],
  exports: [RouterModule] // Exporta RouterModule para que esté disponible en toda la aplicación
})
export class AppRoutingModule { }
