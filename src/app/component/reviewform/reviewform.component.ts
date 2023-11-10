import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from 'src/app/service/review.service';



@Component({
  selector: 'app-reviewform',
  templateUrl: './reviewform.component.html',
  styleUrls: ['./reviewform.component.css']
})
export class ReviewformComponent implements OnInit {

  @Input() moviename: string;
  @Input() movieyear: string;
  @Input() revrating: string;
  @Input() revdesc: string;

  private currrating: any;


  constructor(private reviewService: ReviewService) { }

  handleStarsClick(box) {
      this.currrating = box;
      document.getElementById('star' + box).style.backgroundColor = "yellow";
      
      console.log(this.currrating);
      this.starmouseout();
  }
  
  ngOnInit() {
    this.currrating = 0;
  }
  getmovie(){
    this.reviewService.getmovie(this.moviename, this.movieyear, "movieformpart2");
  }
  savereview(){
    this.reviewService.savereview(JSON.parse(localStorage.getItem("curruser")).profileid, document.getElementById("valuetoset").innerHTML, this.currrating, this.revdesc)
  }
  
  
  staradjust(rating) {
    console.log(this.currrating); 
    console.log("trigger staradjust");
    for (let i = 1; i <= 10; i++) {
      if(i <= rating) {
        document.getElementById('star' + i).style.backgroundColor = "yellow";
        console.log("changing star " + i + " to yellow");
      } else {
        document.getElementById('star' + i).style.backgroundColor = "black";
        console.log("changing star " + i + " to black");
      }
        
      } 
    }
  

  starmouseout() {
    console.log("trigger mouseout")
    for (let i = 1; i <= 10; i++) {
      if(i <= this.currrating) {
        document.getElementById('star' + i).style.backgroundColor = "yellow";
        console.log("changing star " + i + " to yellow");
      } else {
        document.getElementById('star' + i).style.backgroundColor = "black";
        console.log("changing star " + i + " to black");
      }
        
      } 
  }

}
