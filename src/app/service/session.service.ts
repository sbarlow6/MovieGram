import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '../../../node_modules/@angular/router';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  postResult: Object;
  userId:string;
  
  constructor(private httpClient: HttpClient,
    private router: Router) { }


    login(username, password){
      console.log("LOGIN GOT CALLED WITH PARAMETERS username: " + username + " password: " + password);
      const headers = {
        headers: new HttpHeaders({
          'Content-Type':  'application/x-www-form-urlencoded',
        }), withCredentials:false
      };   
  
      let body = `username=${username}&password=${password}`;
      
      

      this.httpClient.post("http://localhost:8085/login", body,  headers )
      .subscribe( (data:any) => {
        console.log(data);
        if(data){
          this.router.navigateByUrl('/userhome');
          let users:User = data;
          console.log(JSON.stringify(users));
          localStorage.setItem('curruser', JSON.stringify(users));          
        }
      });
  
    }

    logout(){
      this.httpClient.get("http://localhost:8085/logout",{withCredentials:true}).subscribe();
      localStorage.clear;
    }

    register(username, password, password2, fullname, aboutme){
      const headers = {
        headers: new HttpHeaders({
          'Content-Type':  'application/x-www-form-urlencoded',
        }), withCredentials:false
      }; 
      let body = `username=${username}`;
      
      this.httpClient.post("http://localhost:8085/checkuser", body, headers).subscribe( (data:any) => {
        let usertaken:boolean = data;
        if(usertaken == false) {
          if (password == password2) {
            let body2 = `username=${username}&password=${password}&fullname=${fullname}&aboutme=${aboutme}`;
            this.httpClient.post("http://localhost:8085/register", body2, headers).subscribe(msg=>{this.postResult = msg; console.log(msg);}, err=>{ console.log(err); throw "";});
            this.router.navigateByUrl('/loginform');
          } else {
            document.getElementById("errorholder").innerHTML = "Your passwords do not match. Please double check them and try again.";
          }
        } else {
          document.getElementById("errorholder").innerHTML = "Your username is taken. Please choose a different one.";
        }
        
        
      });
       

    }
  
  }
