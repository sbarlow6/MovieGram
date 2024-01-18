import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import { Review } from 'src/app/model/review';
import { ReviewService } from 'src/app/service/review.service';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';


@Component({
  selector: 'app-review',
  templateUrl: './review-container.component.html',
  styleUrls: ['./review-container.component.css'],
  
})
export class ReviewContainerComponent {
  @Input() movie: Movie; 
  @Input() review: Review; 
  @Input() format: number; // Format 1: Has no user link, Format 2: has delete button and no open review, Format 3: has no user link and no open review
  uname: String;

  constructor(private sessionService: SessionService, private reviewService: ReviewService, private router: Router){}
  onDeleteReview(revid) {
    this.sessionService.checksession().subscribe((userFound: boolean) => {
      if (userFound) {
        this.reviewService.deletereview(revid);
        this.router.navigateByUrl('/');
      } else {
        localStorage.setItem('previousRoute', this.router.url);
        this.router.navigateByUrl('/loginform');
      }
    });
    
  }
  openReview(revid: string): void {
    this.router.navigate(['/review'], { queryParams: { revid: revid } });
  }

  ngOnInit() {
    this.reviewService.getnamebyuserid(this.review.userid).subscribe(res2 => {
      this.uname = res2.uname;
    });
  }
}

