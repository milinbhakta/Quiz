import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  quizzes: any = {
  };
  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.getAllQuizzes().subscribe(res => {
      this.quizzes = res;
    });
  }

}
