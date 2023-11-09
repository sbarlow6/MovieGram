import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() username: string;
  @Input() password: string;
  @Input() password2: string;
  @Input() fullname: string;
  @Input() aboutme: string;
  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    if(localStorage.getItem("curruser")) {
      document.getElementById("loglink").style.display = "none";
      document.getElementById("logdlink").style.display = "block";
    } else {
      document.getElementById("loglink").style.display = "block";
      document.getElementById("logdlink").style.display = "none";
    }
  }

  register() {
    this.sessionService.register(this.username, this.password, this.password2, this.fullname, this.aboutme);
  }

}
