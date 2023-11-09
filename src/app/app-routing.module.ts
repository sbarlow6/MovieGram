import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserhomeComponent } from './component/userhome/userhome.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { ReviewformComponent } from './component/reviewform/reviewform.component';
import { RegisterComponent } from './component/register/register.component';
import { ReviewComponent } from './component/review/review.component';
import { FindmovieformComponent } from './component/findmovieform/findmovieform.component';
import { DeletebuttonComponent } from './component/deletebutton/deletebutton.component';



const appRoutes: Routes = [
  { path: 'userhome', component: UserhomeComponent, children: [
    { path: '', component: HomeComponent},
    { path: 'reviewform', component: ReviewformComponent}
  ]},
  { path: 'loginform', component: LoginComponent},
  { path: 'registerform', component: RegisterComponent},
  { path: '', component: HomeComponent},
  { path: 'review', component: ReviewComponent, children: [
    {path: '', component: DeletebuttonComponent}
  ]},
  { path: 'findmovieform', component: FindmovieformComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
