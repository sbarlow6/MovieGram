import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { SessionService } from './service/session.service';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project2Front';
  retrievedCurrUser: string;
  
  logout() {
    this.sessionService.logout();
    localStorage.clear();
  }
  ngOnInit() {
    let userObject = JSON.parse(localStorage.getItem('curruser'));
    try {
      this.retrievedCurrUser = userObject.username;
    } catch {
      console.log("Got an error with the username attempt")
    }
  }
  // writeReview() {
  //   console.log("Write Review link activated");
  //   console.log("The check session function has evaluated to : " + JSON.stringify(this.sessionService.checksession()));
  //   this.sessionService.checksession().subscribe((userFound: boolean) => {
  //     if (userFound) {
  //       console.log("User found redirecting to review form.");
  //       this.router.navigate(['/userhome/reviewform'], { queryParams: { imdbIDent: "tt9603212" } });
  //     } else {
  //       console.log("User not found redirecting to login form.");
  //       this.router.navigateByUrl('/loginform');
  //     }
  //   });
       
      
  // }
  constructor(private sessionService: SessionService, private httpClient: HttpClient, private router: Router){
  //   let userObject = JSON.parse(localStorage.getItem('curruser'));
  //   try {
  //     this.retrievedCurrUser = userObject.username;
  //   } catch {
  //     console.log("Got an error with the username attempt")
  //   }
    
  // }
  }}

