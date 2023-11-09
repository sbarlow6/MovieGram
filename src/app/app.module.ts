import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { UserhomeComponent } from './component/userhome/userhome.component';
import { HomeComponent } from './component/home/home.component';
import { ReviewformComponent } from './component/reviewform/reviewform.component';
import { RegisterComponent } from './component/register/register.component';
import { ReviewComponent } from './component/review/review.component';
import { FindmovieformComponent } from './component/findmovieform/findmovieform.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DeletebuttonComponent } from './component/deletebutton/deletebutton.component';
import { ReviewContainerComponent } from './component/review-container/review-container.component';
import { ReviewsByMovieComponent } from './component/reviews-by-movie/reviews-by-movie.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserhomeComponent,
    HomeComponent,
    ReviewformComponent,
    RegisterComponent,
    ReviewComponent,
    FindmovieformComponent,
    DeletebuttonComponent,
    ReviewContainerComponent,
    ReviewsByMovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    NgbModule
  ],
  entryComponents: [ReviewContainerComponent, ReviewsByMovieComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
