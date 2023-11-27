import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '../../../node_modules/@angular/router';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  postResult: Object;
  userId:string;
  
  constructor(private httpClient: HttpClient,
    private router: Router) { }


    login(username, password){
      const headers = {
        headers: new HttpHeaders({
          'Content-Type':  'application/x-www-form-urlencoded',
        }), withCredentials:false
      };   
  
      let body = `username=${username}&password=${password}`;
      
      

      this.httpClient.post(environment.backendURL + "/login", body,  headers )
      .subscribe( (data:any) => {
        if(data){
          this.router.navigateByUrl('/userhome');
          let users:User = data;
          localStorage.setItem('curruser', JSON.stringify(users));          
        }
      });
  
    }

    logout(){
      this.httpClient.get(environment.backendURL + "/logout",{withCredentials:true}).subscribe();
      localStorage.clear;
    }

    register(username, password, password2, fullname, aboutme){
      const headers = {
        headers: new HttpHeaders({
          'Content-Type':  'application/x-www-form-urlencoded',
        }), withCredentials:false
      }; 
      let body = `username=${username}`;
      
      this.httpClient.post(environment.backendURL + "/checkuser", body, headers).subscribe( (data:any) => {
        let usertaken:boolean = data;
        if(usertaken == false) {
          if (password == password2) {
            let body2 = `username=${username}&password=${password}&fullname=${fullname}&aboutme=${aboutme}`;
            this.httpClient.post(environment.backendURL + "/register", body2, headers).subscribe(msg=>{this.postResult = msg; console.log(msg);}, err=>{ console.log(err); throw "";});
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
