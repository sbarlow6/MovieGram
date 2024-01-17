import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from '../../service/session.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() username: string;
  @Input() password: string;

  constructor(private sessionService: SessionService,private httpClient: HttpClient, private router: Router) {  }
  
  
  ngOnInit() {
    if(localStorage.getItem("curruser")) {
      document.getElementById("loglink").style.display = "none";
      document.getElementById("logdlink").style.display = "block";
    } else {
      document.getElementById("loglink").style.display = "block";
      document.getElementById("logdlink").style.display = "none";
    }
  }

  login(){
    this.sessionService.login(this.username,this.password);
  }

  logout(){
    this.sessionService.logout();
  }

  // writeReview() {
  //   console.log("Write Review link activated");
  //   if (this.sessionService.checksession()) {
  //     console.log("User found redirecting to review form.");
  //     this.router.navigateByUrl('/userhome/reviewform');
  //   } else {
  //     console.log("User not found redirecting to login form.");
  //     this.router.navigateByUrl('/loginform');
  //   }
       
      
  // }
}


