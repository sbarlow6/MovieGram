import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/model/movie';
import { Review } from 'src/app/model/review';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-reviews-by-movie',
  templateUrl: './reviews-by-movie.component.html',
  styleUrls: ['./reviews-by-movie.component.css']
})
export class ReviewsByMovieComponent implements OnInit {
  @Input() movie: Movie; 
  @Input() reviewArray: Review[];

  constructor(private sessionService: SessionService, private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
    let movie = this.movie;
    let review: Review[] = this.reviewArray;
  }
  writeReview(imdbIDent) {
  this.sessionService.checksession().subscribe((userFound: boolean) => {
    if (userFound) {
      this.router.navigate(['/userhome/reviewform'], { queryParams: { imdbIDent: imdbIDent } });
    } else {
      localStorage.setItem('previousRoute', this.router.url);
      this.router.navigateByUrl('/loginform');
    }
  });

  }
}
