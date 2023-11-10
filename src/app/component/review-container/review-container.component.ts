import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import { Review } from 'src/app/model/review';
import { ReviewService } from 'src/app/service/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review-container.component.html',
  styleUrls: ['./review-container.component.css']
})
export class ReviewContainerComponent {
  @Input() movie: Movie; 
  @Input() review: Review; 
  @Input() format: number; // Format 1: Has no user link, Format 2: has delete button and no open review, Format 3: has no user link and no open review
  uname: String;

  constructor(private reviewService: ReviewService){}
  onDeleteReview(revid: number, event: Event) {
    event.preventDefault();
    console.log("WE GOT THIS FAR")
    this.reviewService.deletereview(revid);
  }
  // staradjust(rating) {
  //   console.log(rating); 
  //   console.log("trigger staradjust");
  //   for (let i = 1; i <= 10; i++) {
  //     if(i <= rating) {
  //       console.log(this.review.revid + 'star' + i)
  //       document.getElementById(this.review.revid + 'star' + i).style.backgroundColor = "yellow";
  //       console.log("changing star " + i + " to yellow");
  //     } else {
  //       document.getElementById(this.review.revid + 'star' + i).style.backgroundColor = "black";
  //       console.log("changing star " + i + " to black");
  //     }
        
  //     } 
  //   }

  ngOnInit() {
    console.log("The rating for this review is: " + this.review.revrating)
    console.log("User id for this is: " + this.review.userid)
    this.reviewService.getnamebyuserid(this.review.userid).subscribe(res2 => {
      this.uname = res2.uname;
    });
    // this.staradjust(this.review.revrating)
  }
}

