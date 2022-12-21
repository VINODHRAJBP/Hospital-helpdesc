import { DeclarationListEmitMode } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './Component/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { CartComponent } from './Component/cart/cart.component';
 
const routes: Routes = [
  {
    path: '', component: DashboardComponent
  },
  {
    path: 'admin-dashboard', component: AdminDashboardComponent
  },

  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'user-dashboard', component: UserDashboardComponent
  },
  {
    path: 'cart', component: CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
