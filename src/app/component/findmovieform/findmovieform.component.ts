import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from 'src/app/service/review.service';

@Component({
  selector: 'app-findmovieform',
  templateUrl: './findmovieform.component.html',
  styleUrls: ['./findmovieform.component.css']
})
export class FindmovieformComponent implements OnInit {
  @Input() moviename: string;
  @Input() movieyear: string;
  constructor(private reviewService: ReviewService) { }

  ngOnInit() {
    if(localStorage.getItem("curruser")) {
      document.getElementById("loglink").style.display = "none";
      document.getElementById("logdlink").style.display = "block";
    } else {
      document.getElementById("loglink").style.display = "block";
      document.getElementById("logdlink").style.display = "none";
    }
  }
  getmovie(){
    let test = this.reviewService.getmovie(this.moviename, this.movieyear, "searchlink");
    
    
  }

  searchforrevs() {
    window.location.href = "/review?imdbid=" + document.getElementById("valuetoset").innerHTML;
  }

}
