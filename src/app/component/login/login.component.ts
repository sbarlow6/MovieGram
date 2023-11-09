import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from '../../service/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() username: string;
  @Input() password: string;

  constructor(private sessionService: SessionService) {  }
  
  
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

}
