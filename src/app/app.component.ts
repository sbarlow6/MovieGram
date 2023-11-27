import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project2Front';
  retrievedCurrUser: string;
  
  logout() {
    localStorage.clear();
  }
  constructor(){
    let userObject = JSON.parse(localStorage.getItem('curruser'));
    try {
      this.retrievedCurrUser = userObject.username;
    } catch {
      console.log("Got an error with the username attempt")
    }
    
  }
}


