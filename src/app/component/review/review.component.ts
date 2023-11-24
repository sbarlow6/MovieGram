import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/model/review';
import { ReviewService } from 'src/app/service/review.service';
import { HttpClient } from '@angular/common/http';
import { Movie } from 'src/app/model/movie';
import { ReviewContainerComponent } from '../review-container/review-container.component';
import { ReviewsByMovieComponent } from '../reviews-by-movie/reviews-by-movie.component';
import { forkJoin } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  createComponent(currmovie, reviews, format) {
    console.log("WE THIS GOT FAR")
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ReviewContainerComponent);
    const componentRef = componentFactory.create(this.injector);
    componentRef.instance.movie = currmovie;
    componentRef.instance.review = reviews;
    componentRef.instance.format = format;

    this.container.insert(componentRef.hostView);
  }
  createComponent2(currmovie, reviewArray) {
    console.log("WE THIS GOT FAR")
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ReviewsByMovieComponent);
    const componentRef = componentFactory.create(this.injector);
    componentRef.instance.movie = currmovie;
    componentRef.instance.reviewArray = reviewArray;
    this.container.insert(componentRef.hostView);
  }
  
  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private router: Router, private reviewService: ReviewService,  private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector) {this.router.routeReuseStrategy.shouldReuseRoute = () => false; }
  reviews: Review[];
  ngOnInit() {
    
    if(localStorage.getItem("curruser")) {
      document.getElementById("loglink").style.display = "none";
      document.getElementById("logdlink").style.display = "block";
    } else {
      document.getElementById("loglink").style.display = "block";
      document.getElementById("logdlink").style.display = "none";
    }
    const user: string = this.route.snapshot.queryParamMap.get('user');
    const imdbid: string = this.route.snapshot.queryParamMap.get('imdbid');
    const revid: string = this.route.snapshot.queryParamMap.get('revid');
    
    if(user) {
    this.reviewService.getreviewsbyuser(user).subscribe(reviews => {
        this.reviews = reviews;
        this.reviews.forEach(reviews => {
          this.httpClient.get(environment.backendURL + "/movieposter?imdbID=" + reviews.movieid).subscribe((res)=>{
            let currmovie: Movie = JSON.parse(JSON.stringify(res));
            this.createComponent(currmovie, reviews, 1);
        });
         });

        });
      } else if (imdbid){

    this.reviewService.getreviewsbymovie(imdbid).subscribe(reviews => {
      this.reviews = reviews;
      let currmovie: Movie;
      let reviewArray: Review[] = [];
      
      let observables = [];
    
      this.reviews.forEach(reviews => {
        let uname;
        let obs = this.reviewService.getnamebyuserid(reviews.userid).pipe(
          switchMap(res2 => {
            uname = res2;
            return this.httpClient.get(environment.backendURL + "/movieposter?imdbID=" + imdbid);
          }),
          tap((res) => {
            currmovie = JSON.parse(JSON.stringify(res));
            let newReview: Review = new Review;
            newReview.revrating = reviews.revrating;
            newReview.revdesc = reviews.revdesc;
            newReview.uname = uname.uname;
            newReview.revid = reviews.revid;
            reviewArray.push(newReview);
          })
        );
        observables.push(obs);
      });
    
      forkJoin(observables).subscribe(() => {
        console.log(JSON.stringify(reviewArray));
        this.createComponent2(currmovie, reviewArray);
      });
    });
  
    } else if (revid){


    this.reviewService.getreviewsbyone(revid).subscribe(reviews => {
      this.reviews = reviews;
      this.reviews.forEach(reviews => {
        this.httpClient.get(environment.backendURL + "/movieposter?imdbID=" + reviews.movieid).subscribe((res)=>{
          let currmovie: Movie = JSON.parse(JSON.stringify(res));
          
          this.reviewService.getnamebyuserid(reviews.userid).subscribe(res2 => {
            let uname = res2;
            let jsonguy = JSON.parse(localStorage.getItem('curruser'));
            try {
            if (reviews.userid == jsonguy.profileid) {
            this.createComponent(currmovie, reviews, 2);
            } else {
              this.createComponent(currmovie, reviews, 3);
              }
            } catch {
              this.createComponent(currmovie, reviews, 3);
            }
            });
            
            
        });

        });
    });

    }
  }

  }


