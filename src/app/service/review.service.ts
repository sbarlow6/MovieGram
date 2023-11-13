import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Review } from '../model/review';
import { Observable } from 'rxjs';
import { Movie } from '../model/movie';
import { jsonpFactory } from '@angular/http/src/http_module';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class ReviewService {
  postResult: Object;
  id: number;
  http: any;
  constructor(private httpClient: HttpClient,
    private router: Router) { }


    getreviews(): Observable<Review[]> {
      let listoreviews = this.httpClient.get(environment.backendURL + "/getreviews") as Observable<Review[]>;
      return listoreviews;

    }
    
    getreviewsbyuser(username): Observable<Review[]> {
      let listoreviews;
      listoreviews = this.httpClient.get(environment.backendURL + "/reviewsbyuser?username=" + username) as Observable<Review[]>;
      return listoreviews;
          
    }

    getreviewsbymovie(imdbid):  Observable<Review[]> {
      let listoreviews;
      listoreviews = this.httpClient.get(environment.backendURL + "/reviewsbymovie?imdbid=" + imdbid) as Observable<Review[]>;
      return listoreviews;
    }

    getreviewsbyone(revid):  Observable<Review[]> {
      let listoreviews;
      listoreviews = this.httpClient.get(environment.backendURL + "/reviewsbyone?revid=" + revid) as Observable<Review[]>;
      return listoreviews;
    }
    getnamebyuserid(userid) {
      let username;
      username = this.httpClient.get(environment.backendURL + "/namebyuser?userid=" + userid) as Observable<String>;
      return username;
    }

    getmovie(moviename, movieyear, reveal) {

      
      this.httpClient.get(environment.backendURL + "/movies?moviename="
                                              + moviename
                                              + "&movieyear=" + movieyear).subscribe( (data:any) => {
          if(data){
            document.getElementById(reveal).style.display = "block";
            let retmovie:Movie = data;
            let currrevmoviehold = document.getElementById("currrevmoviehold");
            if(retmovie.Title != null) {
            document.getElementById("valuetoset").innerHTML = retmovie.imdbID;
            currrevmoviehold.innerHTML = "<div class='innerholder'> Title: " + retmovie.Title 
              + "<br><img src='" + retmovie.Poster + "'>";
            } else {
              currrevmoviehold.innerHTML = "Movie not found";
              document.getElementById(reveal).style.display = "none";
            }
          }
        });
      
    }
    
    savereview(userid, movieid, revrating, revdesc) {
      let r = new Review;
      r.userid = userid;
      r.movieid = movieid;
      r.revrating = revrating;
      r.revdesc = revdesc;
      const headers = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        }), withCredentials:false
      };
      
      let body = JSON.stringify(r);


      this.httpClient.post(environment.backendURL + "/savereviews", body, headers).subscribe(msg=>{this.postResult = msg; console.log(msg);}, err=>{ console.log(err); throw "";});
      this.router.navigateByUrl('/userhome');
    }

    deletereview(revid) {
      console.log("WE ARE GETTING THIS FAR TOO");
      let r = revid;
      //r.revid = revid;
    
      // Create HttpHeaders correctly
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    
      console.log("REQUEST BODY: " + JSON.stringify(r) + " REQUEST HEADERS: " + JSON.stringify(headers));
    
      const httpOptions = {
        headers: headers,
        body: JSON.stringify(r)
      };
    
      this.httpClient.delete(environment.backendURL + "/deletereviews", httpOptions)
        .subscribe(
          msg => {
            this.postResult = msg;
            console.log(msg);
          },
          err => {
            console.log(err);
            throw "";
          }
        );
        this.router.navigateByUrl('/userhome');
    }
}
