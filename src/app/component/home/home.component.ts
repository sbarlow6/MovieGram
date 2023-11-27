import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { ReviewService } from 'src/app/service/review.service';
import { Review } from 'src/app/model/review';
import { HttpClient } from '@angular/common/http';
import { Movie } from 'src/app/model/movie';
import { Router } from '@angular/router';
import { ReviewContainerComponent } from '../review-container/review-container.component';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  constructor(private reviewService: ReviewService, private router: Router, private httpClient: HttpClient,private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector) { }
  createComponent(currmovie, reviews, format) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ReviewContainerComponent);
    const componentRef = componentFactory.create(this.injector);
    componentRef.instance.movie = currmovie;
    componentRef.instance.review = reviews;
    componentRef.instance.format = format;
    this.container.insert(componentRef.hostView);
  }
  getRandomInt(max) {
    const randomNumbers: number[] = [];
    while (randomNumbers.length < 3) {

      const randomNumber = Math.floor(Math.random() * max);
        if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
      }
    }
      return randomNumbers;
  }
  reviews: Review[];
  featuredreviews: Review[] = [];
  
  ngOnInit() {
      if(localStorage.getItem("curruser")) {
        document.getElementById("loglink").style.display = "none";
        document.getElementById("logdlink").style.display = "block";
        this.router.navigateByUrl('/userhome');
      } else {
        document.getElementById("loglink").style.display = "block";
        document.getElementById("logdlink").style.display = "none";
      }
      let revcount = 0;
    this.reviewService.getreviews().subscribe(reviews => {
      this.reviews = reviews;
      let featuredNumbers: number[] = this.getRandomInt(reviews.length);
      this.featuredreviews.push(this.reviews[featuredNumbers[0]]);
      this.featuredreviews.push(this.reviews[featuredNumbers[1]]);
      this.featuredreviews.push(this.reviews[featuredNumbers[2]]);
      this.featuredreviews.forEach(reviews => {
        this.httpClient.get(environment.backendURL + "/movieposter?imdbID=" + reviews.movieid).subscribe((res)=>{
          
          if (revcount < 3) {
            let currmovie: Movie = JSON.parse(JSON.stringify(res));
            this.createComponent(currmovie, reviews, 1);
            revcount++;
          }
          
            });
      
      });
    

  });
  

  }}
