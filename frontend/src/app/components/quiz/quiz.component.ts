import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quiz: any = {} ;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.quizSelected.subscribe(quiz => this.quiz = quiz);
  }

  Post(quiz) {
    console.log(quiz);
    this.api.postQuestion(quiz);
  }

}
