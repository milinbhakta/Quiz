import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-quizlist',
  templateUrl: './quizlist.component.html',
  styleUrls: ['./quizlist.component.css']
})
export class QuizlistComponent implements OnInit {
  quizzes: any = {
  };
  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.getQuizzes().subscribe(res => {
      this.quizzes = res;
    });
  }
}
