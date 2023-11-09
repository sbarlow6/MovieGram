import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem("curruser")) {
      let jsonguy = JSON.parse(localStorage.getItem('curruser'));
    document.getElementById('nameholder').innerHTML = jsonguy.fullname;
    } else {
      this.router.navigateByUrl('/');
    }
    
    
  }

  

}
