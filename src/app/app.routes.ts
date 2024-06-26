import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterAsistanceComponent } from './components/register-asistance/register-asistance.component';

export const routes: Routes = [
    {path: '', redirectTo:'login', pathMatch: 'full'},
    {path: 'login', component:LoginComponent},
    {path: 'dashboard', component:DashboardComponent},
    {path: 'register-asistance', component:RegisterAsistanceComponent},
    {path: '**', redirectTo:'login', pathMatch: 'full'}
];
