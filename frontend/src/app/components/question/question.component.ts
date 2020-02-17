import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  question: any = {} ;
  quizId;

  constructor(public api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.quizId = this.route.snapshot.paramMap.get('quizId');
    console.log(this.quizId);
    this.api.questionSelected.subscribe(question => this.question = question);
  }

  Post(question) {
    question.quizId = this.quizId;
    console.log(question);
    this.api.postQuestion(question);
  }

}
