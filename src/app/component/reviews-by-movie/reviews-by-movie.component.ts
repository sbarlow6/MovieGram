import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import { Review } from 'src/app/model/review';

@Component({
  selector: 'app-reviews-by-movie',
  templateUrl: './reviews-by-movie.component.html',
  styleUrls: ['./reviews-by-movie.component.css']
})
export class ReviewsByMovieComponent implements OnInit {
  @Input() movie: Movie; 
  @Input() reviewArray: Review[];

  constructor() { }

  ngOnInit() {
    let movie = this.movie;
    let review: Review[] = this.reviewArray;
  }

}
