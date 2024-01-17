import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/service/review.service';



@Component({
  selector: 'app-reviewform',
  templateUrl: './reviewform.component.html',
  styleUrls: ['./reviewform.component.css']
})
export class ReviewformComponent implements OnInit {

  // @Input() moviename: string;
  // @Input() movieyear: string;
  @Input() imdbIDent: string;
  @Input() revrating: string;
  @Input() revdesc: string;

  private currrating: any;


  constructor(private reviewService: ReviewService, private route: ActivatedRoute) { }

  handleStarsClick(box) {
      this.currrating = box;
      document.getElementById('star' + box).style.backgroundColor = "yellow";
      
      this.starmouseout();
  }
  
  ngOnInit() {
    this.currrating = 0;
    const imdbIDent: string = this.route.snapshot.queryParamMap.get('imdbIDent');
    this.reviewService.getPoster(imdbIDent);
  }
  // getmovie(){
  //   this.reviewService.getmovie(this.moviename, this.movieyear, "movieformpart2");
  // }
  savereview(){
    this.reviewService.savereview(this.route.snapshot.queryParamMap.get('imdbIDent'), this.currrating, this.revdesc)
  }
  
  
  staradjust(rating) {
    
    for (let i = 1; i <= 10; i++) {
      if(i <= rating) {
        document.getElementById('star' + i).style.backgroundColor = "yellow";
      } else {
        document.getElementById('star' + i).style.backgroundColor = "black";
      }
        
      } 
    }
  

  starmouseout() {
    for (let i = 1; i <= 10; i++) {
      if(i <= this.currrating) {
        document.getElementById('star' + i).style.backgroundColor = "yellow";
      } else {
        document.getElementById('star' + i).style.backgroundColor = "black";
      }
        
      } 
  }

}
